// YouTube Blocker - Background Service Worker

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url) {
    checkAndBlockYouTube(tab.url, tabId);
  }
});

// Listen for tab creation
chrome.tabs.onCreated.addListener((tab) => {
  if (tab.url) {
    checkAndBlockYouTube(tab.url, tab.id);
  }
});

// Check if URL is YouTube and block it
function checkAndBlockYouTube(url, tabId) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    // Check if it's YouTube (youtube.com or www.youtube.com)
    if (hostname === 'youtube.com' || hostname === 'www.youtube.com') {
      // Record the attempt
      recordAttempt();
      
      // Redirect to blocked page
      const blockedPageUrl = chrome.runtime.getURL('blocked.html');
      chrome.tabs.update(tabId, { url: blockedPageUrl });
    }
  } catch (error) {
    // Invalid URL, ignore
    console.error('Error processing URL:', error);
  }
}

// Record access attempt with timestamp
async function recordAttempt() {
  try {
    const result = await chrome.storage.local.get(['attempts']);
    const attempts = result.attempts || [];
    
    // Add new attempt with current timestamp
    attempts.push({
      timestamp: Date.now()
    });
    
    // Save back to storage
    await chrome.storage.local.set({ attempts });
    
    console.log('Attempt recorded:', new Date().toISOString());
  } catch (error) {
    console.error('Error recording attempt:', error);
  }
}
