// Main app JS code

// Initial page
var currentPage = 'welcome';
var currentUserIndex = 0;
var USER_PIC_URLS = [
    'greengithubcat.png',
    'githubcat.png',
    'purplegithubcat.png',
    'redgithubcat.png',
    'bluegithubcat.png'
];
// Array of users
var users = [];
// location
var prevTime = 0;

initializeUI();
