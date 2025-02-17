interface AvatarIF {
  url: string;
}

export default function Avatar({ url }: AvatarIF) {
  return (
    <div className="rounded-full w-9 h-9 overflow-hidden lg:w-[45px] lg:h-[45px]">
      <img src={url} alt="" />
    </div>
  );
}
