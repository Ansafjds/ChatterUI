import { AppSettings } from '@lib/constants/GlobalValues'
import { useAppMode } from '@lib/state/AppMode'
import { Chats } from '@lib/state/Chat'
import { Theme } from '@lib/theme/ThemeManager'
import { Pressable, Text, View } from 'react-native'
import { useMMKVBoolean } from 'react-native-mmkv'
import { useShallow } from 'zustand/react/shallow'
import { AntDesign } from '@expo/vector-icons'
import Avatar from '@components/views/Avatar'

import ChatQuickActions, { useChatActionsState } from './ChatQuickActions'
import ChatAttachments from './ChatAttachments'
import ChatText from './ChatText'
import ChatTextLast from './ChatTextLast'
import { useChatEditorStore } from './ChatEditor'
import ChatSwipes from './ChatSwipes'

type ChatTextProps = {
    index: number
    nowGenerating: boolean
    isLastMessage: boolean
    isGreeting: boolean
}

const ChatBubble: React.FC<ChatTextProps> = ({
    index,
    nowGenerating,
    isLastMessage,
    isGreeting,
}) => {
    const message = Chats.useEntryData(index)
    const { appMode } = useAppMode()
    const [showTPS, _] = useMMKVBoolean(AppSettings.ShowTokenPerSecond)
    const [sillyTavernMode] = useMMKVBoolean(AppSettings.SillyTavernMode)
    const [showTimestamps] = useMMKVBoolean(AppSettings.ShowMessageTimestamps)
    const [showCharAvatars] = useMMKVBoolean(AppSettings.ShowCharacterAvatars)
    const [showUserAvatars] = useMMKVBoolean(AppSettings.ShowUserAvatars)
    const [compactMode] = useMMKVBoolean(AppSettings.CompactChatMode)
    const [enableReactions] = useMMKVBoolean(AppSettings.EnableMessageReactions)
    const [showContextTokens] = useMMKVBoolean(AppSettings.ShowContextTokens)
    const [showPersonality] = useMMKVBoolean(AppSettings.ShowCharacterPersonality)
    const [showCharStatus] = useMMKVBoolean(AppSettings.ShowCharacterStatus)
    
    const { color, spacing, borderRadius, fontSize } = Theme.useTheme()

    const { activeIndex, setShowOptions } = useChatActionsState(
        useShallow((state) => ({
            setShowOptions: state.setActiveIndex,
            activeIndex: state.activeIndex,
        }))
    )

    const showEditor = useChatEditorStore((state) => state.show)
    const handleEnableEdit = () => {
        if (!nowGenerating) showEditor(index)
    }

    const hasSwipes = message?.swipes?.length > 1
    const showSwipe = !message.is_user && isLastMessage && (hasSwipes || !isGreeting)
    const timings = message.swipes[message.swipe_id].timings

    // Format timestamp for SillyTavern mode
    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    // Get character avatar if available
    const getCharacterAvatar = () => {
        if (!message || message.is_user || !showCharAvatars) return null
        // This would need to be implemented based on your character system
        return null
    }

    // Get user avatar if available
    const getUserAvatar = () => {
        if (!message || !message.is_user || !showUserAvatars) return null
        // This would need to be implemented based on your user system
        return null
    }

    const isUserMessage = message?.is_user
    const messageTime = message?.timestamp ? formatTimestamp(message.timestamp) : null

    return (
        <View style={[
            compactMode && { marginBottom: spacing.xs }
        ]}>
            {/* SillyTavern-style message header */}
            {sillyTavernMode && (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: spacing.xs,
                    paddingHorizontal: spacing.sm,
                }}>
                    {/* Avatar */}
                    {(isUserMessage ? getUserAvatar() : getCharacterAvatar()) && (
                        <Avatar
                            size={24}
                            source={isUserMessage ? getUserAvatar() : getCharacterAvatar()}
                            style={{ marginRight: spacing.xs }}
                        />
                    )}
                    
                    {/* Character/User name */}
                    <Text style={{
                        color: color.text._400,
                        fontSize: fontSize.s,
                        fontWeight: '600',
                        flex: 1,
                    }}>
                        {isUserMessage ? 'You' : message?.character_name || 'Character'}
                    </Text>

                    {/* Timestamp */}
                    {showTimestamps && messageTime && (
                        <Text style={{
                            color: color.text._500,
                            fontSize: fontSize.s,
                            fontWeight: '300',
                        }}>
                            {messageTime}
                        </Text>
                    )}

                    {/* Character status indicator */}
                    {!isUserMessage && showCharStatus && (
                        <View style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: color.success._300,
                            marginLeft: spacing.xs,
                        }} />
                    )}
                </View>
            )}

            <Pressable
                onPress={() => {
                    setShowOptions(activeIndex === index || nowGenerating ? undefined : index)
                }}
                style={{
                    backgroundColor: color.neutral._200,
                    borderColor: color.neutral._200,
                    borderWidth: 1,
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.m,
                    minHeight: 40,
                    borderRadius: borderRadius.m,
                    shadowColor: color.shadow,
                    boxShadow: [
                        {
                            offsetX: 1,
                            offsetY: 1,
                            spreadDistance: 2,
                            color: color.shadow,
                            blurRadius: 4,
                        },
                    ],
                }}
                onLongPress={handleEnableEdit}>
                
                {/* Character personality preview */}
                {sillyTavernMode && !isUserMessage && showPersonality && message?.character_personality && (
                    <View style={{
                        backgroundColor: color.neutral._100,
                        padding: spacing.xs,
                        borderRadius: borderRadius.s,
                        marginBottom: spacing.xs,
                        borderLeftWidth: 3,
                        borderLeftColor: color.primary._300,
                    }}>
                        <Text style={{
                            color: color.text._400,
                            fontSize: fontSize.s,
                            fontStyle: 'italic',
                        }}>
                            {message.character_personality}
                        </Text>
                    </View>
                )}

                {isLastMessage ? (
                    <ChatTextLast nowGenerating={nowGenerating} index={index} />
                ) : (
                    <ChatText nowGenerating={nowGenerating} index={index} />
                )}
                <ChatAttachments index={index} />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: spacing.xs,
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Context tokens display */}
                        {showContextTokens && appMode === 'local' && (
                            <Text style={{
                                color: color.text._500,
                                fontSize: fontSize.s,
                                fontWeight: '300',
                                marginRight: spacing.m,
                            }}>
                                Tokens: {message?.token_count || 'N/A'}
                            </Text>
                        )}

                        {/* TPS display */}
                        {showTPS && appMode === 'local' && timings && (
                            <Text style={{
                                color: color.text._500,
                                fontWeight: '300',
                                fontSize: fontSize.s,
                            }}>
                                {`Prompt: ${getFiniteValue(timings.prompt_per_second)} t/s`}
                                {`   Gen: ${getFiniteValue(timings.predicted_per_second)} t/s`}
                            </Text>
                        )}
                    </View>

                    {/* Message reactions */}
                    {sillyTavernMode && enableReactions && (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: spacing.xs,
                        }}>
                            <Pressable style={{
                                padding: spacing.xs,
                                borderRadius: borderRadius.s,
                                backgroundColor: color.neutral._100,
                            }}>
                                <AntDesign name="like1" size={16} color={color.text._400} />
                            </Pressable>
                            <Pressable style={{
                                padding: spacing.xs,
                                borderRadius: borderRadius.s,
                                backgroundColor: color.neutral._100,
                            }}>
                                <AntDesign name="hearto" size={16} color={color.text._400} />
                            </Pressable>
                            <Pressable style={{
                                padding: spacing.xs,
                                borderRadius: borderRadius.s,
                                backgroundColor: color.neutral._100,
                            }}>
                                <AntDesign name="star" size={16} color={color.text._400} />
                            </Pressable>
                        </View>
                    )}

                    <ChatQuickActions
                        nowGenerating={nowGenerating}
                        isLastMessage={isLastMessage}
                        index={index}
                    />
                </View>
            </Pressable>
            {showSwipe && (
                <ChatSwipes index={index} nowGenerating={nowGenerating} isGreeting={isGreeting} />
            )}
        </View>
    )
}

const getFiniteValue = (value: number | null) => {
    if (!value || !isFinite(value)) return (0).toFixed(2)
    return value.toFixed(2)
}

export default ChatBubble
