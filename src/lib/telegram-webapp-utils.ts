// Utility functions for working with Telegram WebApp
// Based on official Telegram documentation: https://core.telegram.org/api/web-events
// Force update for git push

/**
 * Safely access the Telegram WebApp API
 */
export const getTelegramWebApp = () => {
  if (typeof window !== 'undefined') {
    return (window as any).Telegram?.WebApp;
  }
  return null;
};

/**
 * Share a story using the Telegram WebApp API
 * Implementation follows Telegram's Web Events documentation:
 * https://core.telegram.org/api/web-events
 */
export const shareToTelegramStory = (options: { 
  mediaUrl: string, 
  caption?: string,
  widget_link?: {
    url: string,
    text?: string
  },
  onSuccess?: () => void,
  onError?: (error: any) => void
}) => {
  try {
    const { mediaUrl, caption = '', widget_link, onSuccess, onError } = options;
    
    console.log('DEBUG STORY SHARE: Starting story sharing process');
    console.log('DEBUG STORY SHARE: Media URL provided:', mediaUrl);
    
    // Get the Telegram WebApp instance
    const tg = (window as any).Telegram?.WebApp;
    console.log('DEBUG STORY SHARE: Telegram WebApp available:', Boolean(tg));
    
    if (tg) {
      // Use the direct Telegram.WebApp.shareToStory method with the correct parameter format
      tg.shareToStory({
        media_url: mediaUrl,
        text: caption,
        widget_link: widget_link ? {
          url: widget_link.url,
          text: widget_link.text
        } : undefined
      });
      
      if (onSuccess) onSuccess();
      return true;
    } else {
      // Fallback to opening the image directly if Telegram WebApp is not available
      console.log('DEBUG STORY SHARE: Telegram WebApp not available, opening image directly');
      try {
        window.open(mediaUrl, '_blank');
        
        if (onSuccess) onSuccess();
        return true;
      } catch (e) {
        console.error('DEBUG STORY SHARE: Error opening image:', e);
        if (onError) {
          onError(new Error('Failed to open image: ' + (e as Error).message));
        }
        return false;
      }
    }
  } catch (error) {
    console.error('DEBUG STORY SHARE: Fatal error in story sharing utility:', error);
    if (options.onError) {
      options.onError(error);
    }
    return false;
  }
}; 