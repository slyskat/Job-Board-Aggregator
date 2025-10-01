import { BookmarkIcon, Search } from "lucide-react";
import Button from "./ui/Button";

function Header() {
  return (
    <header>
      <div>
        <div>
          <Search />
          <h1>Job Board</h1>
        </div>

        <div>
          <Button>
            <BookmarkIcon></BookmarkIcon>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
