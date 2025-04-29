const blogPosts = [
  {
    title: "How to Make Your Own Browser (Seriously, It's Easier Than You Think)",
    excerpt:
      "Have you ever stared at your browser and thought, 'What if I made my own?' Maybe just for fun, or maybe because you want a distraction-free browser.",
    date: "April 30, 2025",
    link: "posts/how-to-make-browser.html",
  },
  {
    title: "Neural network on a nutshell",
    excerpt:
      "You've probably heard of neural network in if you are in tech or computer science field, machine learning.",
    date: "March 27, 2025",
    link: "posts/neural-network.html",
  },
  // Add more blog posts here
];

// Function to get the most recent post
function getLatestPost() {
  return blogPosts[0];
}
