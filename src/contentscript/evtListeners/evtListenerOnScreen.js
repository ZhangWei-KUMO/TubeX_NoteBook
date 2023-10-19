/* eslint-disable no-undef */
function handleFullScreenChange() {
  chrome.storage.local.get(['opacity'], (result) => {
    if (result.opacity) {
      const opacity = result.opacity / 100;

      console.log('handleFullScreenChange', opacity);
      const hercules = document.querySelector('.hercules_container');
      if (document.fullscreenElement) {
        hercules.style.zIndex = 9999;
        hercules.style.position = 'fixed';
        hercules.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        hercules.style.top = '0px';
        hercules.style.right = '0px';
        hercules.style.backdropFilter = 'blur(10px)';
      } else {
        hercules.style.zIndex = null;
        hercules.style.position = null;
        hercules.style.top = null;
        hercules.style.backgroundColor = null;
        hercules.style.backdropFilter = null;
      }
    }
  });
}

const evtListenerOnScreen = () => {
  document.addEventListener('fullscreenchange', handleFullScreenChange);
  const playerElement = document.querySelector('.html5-video-player');
  const hercules = document.querySelector('.hercules_container');
  const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const cr = entry.contentRect;
      if (cr.width === window.innerWidth) {
        hercules.style.zIndex = 9999;
        hercules.style.position = 'fixed';
        hercules.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'; // 半透明的黑色
        hercules.style.top = '10px';
        hercules.style.left = '10px';
        hercules.style.backdropFilter = 'blur(10px)';
      } else if (!document.fullscreenElement) {
        hercules.style.zIndex = null;
        hercules.style.position = null;
        hercules.style.top = null;
        hercules.style.backgroundColor = null;
        hercules.style.backdropFilter = null;
      }
    }
  });
    // 开始监听播放窗口元素
  ro.observe(playerElement);
};

export default evtListenerOnScreen;