import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useGetAllAds, { AdsState } from '../../domain/useCase/useGetAllAds';
import Ad from '../../domain/model/Ad';
import AdListItem from './AdListItem';
import SearchBar from '../common/SearchBar';

const AdsList: React.FC = () => {
  const { adsState } = useGetAllAds();
  const [filteredAds, setFilteredAds] = useState<Array<Ad>>([])

  const handleSearch = useCallback((query: string) => {
    if (query == '' && adsState.value != null) {
      setFilteredAds(adsState.value)
    }

    setFilteredAds((prev) => {
      return prev.filter((ad) => ad.title.toLowerCase().includes(query.toLowerCase()))
    })
  }, [adsState])

  useEffect(() => {
    if (adsState.value != null) {
      setFilteredAds(adsState.value)
    }
  }, [adsState.value])

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center px-16">
      <div className="relative w-full">
        <div className="py-5 w-full flex items-cente justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="m-8 relative space-y-4">
          {filteredAds && filteredAds.length ? (
            filteredAds.map((ad: Ad) => <AdListItem ad={ad} key={ad.adId} isDeleteAvaliable={false} />)
          ) : (
            <p className="w-48 bg-gray-300 rounded font-bold p-1">No books to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdsList;
