import React from 'react';
import SearchInput from './components/SearchInput';

interface ISearchPageProps {}

const SearchPage = ({}: ISearchPageProps) => {
  return (
    <section className="p-6 w-full flex flex-col gap-9">
      <SearchInput />
    </section>
  );
};

export default SearchPage;
