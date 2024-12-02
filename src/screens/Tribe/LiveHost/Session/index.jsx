import { useEffect, useState } from "react";
import _ from "lodash";

import SessionList from "../../../../components/Tribe/LiveHost/LiveSession/SessionList";
import Screen from "../../../../layouts/Screen";
import { useFetch } from "../../../../hooks/useFetch";

const LiveSession = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);
  const [brands, setBrands] = useState([]);

  const fetchSessionParameters = {
    page: currentPage,
    limit: 20,
  };

  const { data, isLoading, isFething, refetch } = useFetch(
    "/hr/ecom-live-session",
    [currentPage],
    fetchSessionParameters
  );

  const fetchMoreSessions = () => {
    if (currentPage < data?.data?.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (data?.data?.data?.length) {
      setBrands((prevData) => [...prevData, ...data?.data?.data]);
    }
  }, [data]);

  return (
    <Screen screenTitle="E-Commerce Live Session">
      <SessionList
        data={brands}
        isFetching={isFething}
        isLoading={isLoading}
        refetch={refetch}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
        fetchMore={fetchMoreSessions}
      />
    </Screen>
  );
};

export default LiveSession;
