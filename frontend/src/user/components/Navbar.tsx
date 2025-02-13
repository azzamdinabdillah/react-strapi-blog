export function Navbar() {
  return (
    <div className="hidden xl:flex justify-between items-center xl:py-14 xl:max-w-[1260px] mx-auto absolute top-0 left-0 right-0">
        <img src="/public/icons/brand.svg" alt="" />
        <div className="text-white text-[18px] font-medium gap-10 flex items-center">
            <a href="">Design Tools</a>
            <a href="">Daily Updates</a>
            <a href="">Tutorials</a>
            <a href="">Library</a>
        </div>
        <button>Subscribe</button>
    </div>
  )
}