import { ReactNode } from "react";

export default function ListBlog({
  children,
  headerName,
}: {
  children: ReactNode;
  headerName: string;
}) {
  return (
    <div className="mx-3 md:mx-5">
      <div className="my-10 md:max-w-[850px] lg:max-w-[970px] flex justify-center items-center md:mx-auto md:my-14 lg:my-28">
        <div className="flex flex-col gap-7 xl:gap-12 w-full">
          <div className="header">
            <h2 className="text-h2 text-blue text-2xl mb-5 md:text-[32px] capitalize">
              {headerName}
            </h2>
            <hr className="hr" />
          </div>

          <div className="gap-7 xl:gap-10 flex flex-col items-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
