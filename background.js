function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// https://github.com/acheong08/EdgeGPT/blob/bc1b073347f5bcba088662597958fc085578ffee/src/EdgeGPT.py#L32
function randomIp() {
  return `13.${randomBetween(104, 107)}.${randomBetween(
    0,
    255
  )}.${randomBetween(0, 255)}`;
}
const resourceTypes = [
  "main_frame",
  "sub_frame",
  "script",
  "xmlhttprequest",
  "websocket",
  "other",
];
const condition = {
  resourceTypes,
  // https://www.bing.com/turing/conversation/create
  // https://edgeservices.bing.com/edgesvc/turing/conversation/create
  urlFilter: "turing/conversation/create",
};
chrome.declarativeNetRequest.updateDynamicRules({
  addRules: [
    {
      id: 1,
      priority: 999,
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          {
            operation: "set",
            header: "x-forwarded-for",
            value: randomIp(),
          },
        ],
      },
      condition,
    },
  ],
  removeRuleIds: [1],
});
