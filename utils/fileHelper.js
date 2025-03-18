function generateFileName(file) {
  const now = new Date();
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.]/g, "")
    .slice(0, 14);
  const milliseconds = now.getMilliseconds().toString().padStart(3, "0");
  return `${file}_${timestamp}${milliseconds}`;
}

module.exports = { generateFileName };
