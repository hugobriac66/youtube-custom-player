function PlaybackControlButton({ children, ...rest }) {
  return (
    <div className="bg-blue-500 m-3 p-2 cursor-pointer rounded-full shrink-0" {...rest}>{children}</div>
  );
}

export default PlaybackControlButton;
