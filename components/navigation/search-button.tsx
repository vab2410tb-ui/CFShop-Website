
import { Search } from 'lucide-react';

type SearchProps = {
  setSearchOpen: () => void;
};

const SearchButton = ( {setSearchOpen}:SearchProps) => {
    return (
        <>
            <button onClick={setSearchOpen} className="cursor-pointer" >
                <Search/>
            </button>
        </>
    )
}

export default SearchButton;