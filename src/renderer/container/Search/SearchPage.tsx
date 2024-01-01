import React from 'react';
import SearchInput from './components/SearchInput';
import { Route, Routes } from 'react-router-dom';
import SearchTagFilesPage from './SearchTag/SearchTagFilesPage';
import SearchSimilarPage from './SearchSimilar/SearchSimilarPage';
import SearchTagSimilarPage from './SearchTagSimilar/SearchTagSimilarPage';
import SearchSimilarMemo from './SearchSimilarMemo/SearchSimilarMemo';
import SearchMetaDataFilesPage from './SearchMetaData/SearchMetaDataFilesPage';
import SearchMetadataSimilarPage from './SearchMetadataSimilar/SearchMetadataSimilarPage';
import SearchQueryPage from './SearchQuery/SearchQueryPage';

interface ISearchPageProps {}

const SearchPage = ({}: ISearchPageProps) => {
  return (
    <section className="p-6 w-full flex flex-col gap-9">
      <SearchInput />
      <Routes>
        <Route path="/query/:query" element={<SearchQueryPage />} />

        <Route path="/tag/:tagName" element={<SearchTagFilesPage />} />
        <Route
          path="/metadata/:key/:value"
          element={<SearchMetaDataFilesPage />}
        />

        <Route path="/similar/thumbnail/:id" element={<SearchSimilarPage />} />
        <Route path="/similar/tag/:id" element={<SearchTagSimilarPage />} />
        <Route
          path="/similar/metadata/:id"
          element={<SearchMetadataSimilarPage />}
        />
        <Route path="/similar/memo/:id" element={<SearchSimilarMemo />} />
      </Routes>
    </section>
  );
};

export default SearchPage;
