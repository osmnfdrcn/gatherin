type VideoConferenceProps = {
  roomID: string;
  name: string;
};
const VideoConference = ({ roomID, name }: VideoConferenceProps) => {
  const meeting = async (element: HTMLDivElement) => {
    const { ZegoUIKitPrebuilt } = await import(
      "@zegocloud/zego-uikit-prebuilt"
    );
    const appID = 1518553061;
    const serverSecret = "8a648c7922356869c3af06234ccbe692";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      name
    );
    const zp: any = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: false,
      showTextChat: true,
      showUserList: true,
      maxUsers: 50,
      layout: "Grid",
      showLayoutButton: true,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
        config: {
          role: "LiveRole",
        },
      },
    });
  };
  return <div ref={meeting} style={{ width: "100vw", height: "100vh" }} />;
};

export default VideoConference;
