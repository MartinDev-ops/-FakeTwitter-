// cursor built: compose tweet modal logic

// cursor built: element references
const tweetButton = document.querySelector('.tweetButton');
const floatingTweetBtn = document.querySelector('.floatingTweetBtn');
const composeOverlay = document.getElementById('composeOverlay');
const composeCloseBtn = document.getElementById('composeCloseBtn');
const composeTextarea = document.getElementById('composeTextarea');
const composeCounter = document.getElementById('composeCounter');
const composePostBtn = document.getElementById('composePostBtn');

const MAX_CHARS = 280;

// cursor built: open modal
function openCompose() {
	if (!composeOverlay) return;
	composeOverlay.classList.add('active');
	if (composeTextarea) composeTextarea.focus();
	document.body.style.overflow = 'hidden';
}

// cursor built: close modal
function closeCompose() {
	if (!composeOverlay) return;
	composeOverlay.classList.remove('active');
	if (composeTextarea) composeTextarea.value = '';
	if (composeCounter) composeCounter.textContent = MAX_CHARS;
	if (composePostBtn) composePostBtn.disabled = true;
	document.body.style.overflow = '';
}

// cursor built: attach open handlers
if (tweetButton) tweetButton.addEventListener('click', openCompose);
if (floatingTweetBtn) floatingTweetBtn.addEventListener('click', openCompose);

// cursor built: attach close handlers (guard existence)
if (composeCloseBtn) composeCloseBtn.addEventListener('click', closeCompose);
if (composeOverlay) {
	composeOverlay.addEventListener('click', (e) => {
		if (e.target === composeOverlay) closeCompose();
	});
}

// cursor built: close on Escape
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && composeOverlay && composeOverlay.classList.contains('active')) {
		closeCompose();
	}
});

// cursor built: live counter + enable/disable Post
if (composeTextarea) {
	composeTextarea.addEventListener('input', () => {
		const remaining = MAX_CHARS - composeTextarea.value.length;
		if (composeCounter) composeCounter.textContent = remaining;
		if (composePostBtn) composePostBtn.disabled = composeTextarea.value.trim().length === 0;
		if (composeCounter) composeCounter.style.color = remaining <= 20 ? '#f4212e' : '#536471';
	});
}

// cursor built: fake post action (close + reset)
if (composePostBtn) {
	composePostBtn.addEventListener('click', () => {
		// simulate posting: close modal and reset
		closeCompose();
	});
}

