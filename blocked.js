// Pool of motivational and warning messages
const messages = [
  "You have more important things to do right now.",
  "Your goals won't achieve themselves. Stay focused!",
  "Remember why you installed this extension.",
  "Time is your most valuable resource. Use it wisely.",
  "Success comes from consistency, not distractions.",
  "Your future self will thank you for staying focused.",
  "Great things take time and focus. Keep going!",
  "You're stronger than your urges. Prove it!",
  "Every moment counts. Make this one productive.",
  "You've got work to do. YouTube can wait.",
  "Focus on what matters. You've got this!",
  "Your dreams are more important than entertainment.",
  "Stay committed to your priorities.",
  "Be proud of choosing productivity over procrastination.",
  "You're building a better version of yourself right now.",
  "Discipline is choosing what you want most over what you want now.",
  "The best time to work is always now.",
  "You'll feel better after accomplishing something real.",
  "Don't let mindless scrolling steal your potential.",
  "Your goals are waiting. Get back to them!"
];

// Get a random message from the pool
function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

// Calculate attempts for today (current calendar day)
function getTodayAttempts(attempts) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.getTime();
  
  return attempts.filter(attempt => attempt.timestamp >= todayTimestamp).length;
}

// Load and display statistics
async function loadStatistics() {
  try {
    const result = await chrome.storage.local.get(['attempts']);
    const attempts = result.attempts || [];
    
    // Calculate today's attempts
    const todayCount = getTodayAttempts(attempts);
    
    // Update the display
    document.getElementById('todayCount').textContent = todayCount;
    
  } catch (error) {
    console.error('Error loading statistics:', error);
    document.getElementById('todayCount').textContent = '?';
  }
}

// Initialize the page
function init() {
  // Display random message
  const messageElement = document.getElementById('message');
  messageElement.textContent = getRandomMessage();
  
  // Load statistics
  loadStatistics();
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', init);
