export const OPEN_CHAT_EVENT = "portfolio:open-chat";

export function dispatchOpenChat() {
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
}
