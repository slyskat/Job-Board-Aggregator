import { Filter, MapPin, Search } from "lucide-react";
import Button from "./ui/Button";

function SearchBar({
  searchQuery,
  setSearchQuery,
  locationquery,
  setLocationQuery,
}) {
  return (
    <div>
      <div>
        <div>
          <div>
            <Search />
            <input
              placeholder="Job title, keywords, or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <MapPin />
            <input
              placeholder="Location"
              value={locationquery}
              onChange={(e) => setLocationQuery(e.target.value)}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                setSearchQuery("");
                setLocationQuery("");
              }}
            >
              Clear All
            </Button>
            <Button>
              <Filter />
              Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
