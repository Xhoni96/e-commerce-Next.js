import Link from "next/link";

import { Container } from "./ui/Container";
import { MainNav } from "./MainNav";
import { getCategories } from "@/actions/getCategories";
import { NavbarActions } from "./NavbarActions";

export const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b sticky top-0 z-[999] bg-white">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2 font-bold text-xl">
            Store
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};
