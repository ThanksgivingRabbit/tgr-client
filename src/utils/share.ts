declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    Kakao: any;
  }
}

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
      mobileWebUrl: `https://thanksgivingrabbit.vercel.app/${code}`,
      webUrl: `https://thanksgivingrabbit.vercel.app/${code}`,
    },
  });
};
