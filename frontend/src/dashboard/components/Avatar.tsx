interface AvatarIF {
  url: string;
}

export default function Avatar({ url }: AvatarIF) {
  return (
    <div className="rounded-full w-9 h-9 overflow-hidden">
      <img src={url} alt="" />
    </div>
  );
}
