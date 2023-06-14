export default function generateUniqueKey(): string {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2);
    const uniqueKey = `${timestamp}_${randomString}`;
    return uniqueKey;
  }