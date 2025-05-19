// Utility functions for working with Telegram WebApp
// Based on official Telegram documentation: https://core.telegram.org/api/web-events

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
    name?: string
  },
  onSuccess?: () => void,
  onError?: (error: any) => void
}) => {
  try {
    const { mediaUrl, caption = '', widget_link, onSuccess, onError } = options;
    
    console.log('DEBUG STORY SHARE: Starting story sharing process');
    console.log('DEBUG STORY SHARE: Media URL provided:', mediaUrl);
    
    // Create the payload according to Telegram's expected format
    const payload: any = {}; 
    
    // Add basic properties
    payload.media_url = mediaUrl;
    payload.text = caption;
    
    // Add widget_link if provided
    if (widget_link) {
      console.log('DEBUG STORY SHARE: Adding widget_link:', widget_link);
      payload.widget_link = {
        url: widget_link.url,
        text: widget_link.name
      };
    }
    
    console.log('DEBUG STORY SHARE: Full payload:', JSON.stringify(payload));
    
    // Get the Telegram WebApp instance
    const tg = (window as any).Telegram?.WebApp;
    console.log('DEBUG STORY SHARE: Telegram WebApp available:', Boolean(tg));
    
    // Check if we're in a real Telegram client
    const isRealTelegram = Boolean(tg && 
      tg.initData && 
      tg.initData.length > 0 && 
      tg.initData !== 'TELEGRAM_TEST_INIT_DATA');
    console.log('DEBUG STORY SHARE: In real Telegram client:', isRealTelegram);
    
    // Try opening the image in a new tab for manual sharing if nothing else works
    const fallbackToManualImage = () => {
      console.log('DEBUG STORY SHARE: Opening image directly for manual sharing');
      try {
        window.open(mediaUrl, '_blank');
        return true;
      } catch (e) {
        console.error('DEBUG STORY SHARE: Even opening image failed:', e);
        return false;
      }
    };
    
    // First try using the direct shareStory method if available
    if (tg?.shareStory) {
      console.log('DEBUG STORY SHARE: Found Telegram.WebApp.shareStory method');
      try {
        tg.shareStory(payload);
        console.log('DEBUG STORY SHARE: Called shareStory successfully');
        if (onSuccess) onSuccess();
        return true;
      } catch (e) {
        console.error('DEBUG STORY SHARE: Error calling shareStory:', e);
      }
    }
    
    // Otherwise, try using the OpenStory method if available
    if (tg?.openStory) {
      console.log('DEBUG STORY SHARE: Found Telegram.WebApp.openStory method');
      try {
        tg.openStory(payload);
        console.log('DEBUG STORY SHARE: Called openStory successfully');
        if (onSuccess) onSuccess();
        return true;
      } catch (e) {
        console.error('DEBUG STORY SHARE: Error calling openStory:', e);
      }
    }
    
    // As a fallback, try using the postEvent method
    // Using the original approach with different event types
    
    // Method 1: Using MainButton share functionality if available
    if (tg?.MainButton?.setText && tg?.MainButton?.show && tg?.MainButton?.onClick) {
      console.log('DEBUG STORY SHARE: Using MainButton as fallback for sharing');
      try {
        tg.MainButton.setText('Share Story');
        tg.MainButton.onClick(() => {
          // Try to open the link or share
          if (tg.openLink) {
            console.log('DEBUG STORY SHARE: Opening media URL via MainButton');
            tg.openLink(mediaUrl);
          } else {
            fallbackToManualImage();
          }
          
          if (onSuccess) onSuccess();
        });
        tg.MainButton.show();
        console.log('DEBUG STORY SHARE: MainButton setup completed');
        return true;
      } catch (e) {
        console.error('DEBUG STORY SHARE: Error setting up MainButton:', e);
      }
    }
    
    // Method 2: Direct WebApp method with custom events
    if (tg?.postEvent) {
      console.log('DEBUG STORY SHARE: Using Telegram.WebApp.postEvent method');
      try {
        // First try with web_app_share_to_story
        console.log('DEBUG STORY SHARE: Attempting web_app_share_to_story event');
        tg.postEvent('web_app_share_to_story', payload);
        
        // Then try the standard share_score event
        console.log('DEBUG STORY SHARE: Attempting share_score event as fallback');
        tg.postEvent('share_score', payload);
        
        // Finally fall back to showing a popup
        console.log('DEBUG STORY SHARE: Falling back to showing a popup');
        tg.postEvent('web_app_open_popup', {
          title: 'Share Story',
          message: 'To share this story, please take a screenshot and share it with your friends.',
          buttons: [
            { type: 'ok', text: 'OK', id: 'ok' }
          ]
        });
        console.log('DEBUG STORY SHARE: Event posting completed');
        
        if (onSuccess) setTimeout(onSuccess, 1500);
        return true;
      } catch (e) {
        console.error('DEBUG STORY SHARE: Error posting events:', e);
      }
    }
    
    // Method 3: TelegramWebviewProxy (mobile apps)
    if ((window as any).TelegramWebviewProxy?.postEvent) {
      console.log('DEBUG STORY SHARE: Using TelegramWebviewProxy.postEvent method');
      try {
        (window as any).TelegramWebviewProxy.postEvent(
          'share_score', 
          JSON.stringify(payload)
        );
        console.log('DEBUG STORY SHARE: TelegramWebviewProxy call completed');
        if (onSuccess) onSuccess();
        return true;
      } catch (e) {
        console.error('DEBUG STORY SHARE: Error with TelegramWebviewProxy:', e);
      }
    }
    
    // Method 4: Window.external (Windows phone & some browsers)
    if ((window as any).external?.notify) {
      console.log('DEBUG STORY SHARE: Using window.external.notify method');
      try {
        (window as any).external.notify(JSON.stringify({
          eventType: 'share_score',
          eventData: payload
        }));
        console.log('DEBUG STORY SHARE: window.external.notify call completed');
        if (onSuccess) onSuccess();
        return true;
      } catch (e) {
        console.error('DEBUG STORY SHARE: Error with window.external.notify:', e);
      }
    }
    
    // Method 5: PostMessage API (web clients)
    if (window.parent && window.parent !== window) {
      console.log('DEBUG STORY SHARE: Using window.parent.postMessage method');
      try {
        window.parent.postMessage(JSON.stringify({
          eventType: 'share_score',
          eventData: payload
        }), '*');
        console.log('DEBUG STORY SHARE: window.parent.postMessage call completed');
        if (onSuccess) onSuccess();
        return true;
      } catch (e) {
        console.error('DEBUG STORY SHARE: Error with window.parent.postMessage:', e);
      }
    }
    
    // Method 6: Just try to open the image directly for manual sharing
    if (fallbackToManualImage()) {
      console.log('DEBUG STORY SHARE: Manual image sharing fallback worked');
      if (onSuccess) onSuccess();
      return true;
    }
    
    // If we get here, none of the methods worked
    console.error('DEBUG STORY SHARE: No compatible method found to share story');
    if (onError) {
      onError(new Error('No compatible method found to share story'));
    }
    return false;
  } catch (error) {
    console.error('DEBUG STORY SHARE: Fatal error in story sharing utility:', error);
    if (options.onError) {
      options.onError(error);
    }
    return false;
  }
}; 