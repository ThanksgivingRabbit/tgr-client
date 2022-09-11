export const shareMessage = (from: string, code: string) => {
  if (!window?.Kakao) return;
  const kakao = window.Kakao;

  if (!kakao.isInitialized()) {
    kakao.init('15393a69aa0fcdc6164dd922d8faaaf3');
  }
  kakao.Share.sendDefault({
    objectType: 'text',
    text: `${from} 으로부터 편지가 도착했어요!`,
    link: {
      mobileWebUrl: `http://localhost:3000/songpyeon/${code}`,
      webUrl: `http://localhost:3000/songpyeon/${code}`,
    },
  });
};
