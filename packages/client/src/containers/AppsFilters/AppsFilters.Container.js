import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Apps.Style.css';
import { apiURL } from '../../apiURL';
import { Card } from '../../components/Card/Card.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../../components/Button/Button.component';
import { Loading } from '../../components/Loading/Loading.Component';
import DropDownView from '../../components/CategoriesListDropDown/CategoriesListDropDown.component';
// eslint-disable-next-line import/no-extraneous-dependencies
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from '../../components/Modal/Modal.Component';
import { useUserContext } from '../../userContext';
import { capitalize } from '../../utils/capitalize';
import { getPageMeta } from '../../utils/getPageMeta';
import {
  PRICING_OPTIONS,
  PLATFORMS_OPTIONS,
  SOCIALS_OPTIONS,
  OTHER_OPTIONS,
} from '../../lib/constants/filters';

import {
  faSearch,
  faFilter,
  faList,
  faGrip,
  faBookmark as faBookmarkSolid,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';
import { ListFilter, X } from 'lucide-react';

import globe from '../../assets/images/globe.svg';
import { logInWithEmailAndPassword } from '../../firebase';
import MultiSelectDropdown from '../../components/MultiSelectDropdown/MultiSelectDropdown.component';

const tabs = ['Categories', 'Tags', 'Searches'];

export const Apps = () => {
  const { user } = useUserContext();
  const location = useLocation();
  // const { searchParam } = useParams();
  const [searchTerms, setSearchTerms] = useState();
  const [sortOrder, setSortOrder] = useState('Recent');

  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [features, setFeatures] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [businessModels, setBusinessModels] = useState([]);
  const [useCases, setUseCases] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [filteredUserTypes, setFilteredUserTypes] = useState([]);
  const [filteredBusinessModels, setFilteredBusinessModels] = useState([]);
  const [filteredUseCases, setFilteredUseCases] = useState([]);
  const [filteredIndustries, setFilteredIndustries] = useState([]);
  const [filteredPricing, setFilteredPricing] = useState([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState([]);
  const [filteredSocials, setFilteredSocials] = useState([]);
  const [filteredOther, setFilteredOther] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [showFiltersContainer, setShowFiltersContainer] = useState(false);
  const [showCategoriesContainer, setShowCategoriesContainer] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listView, setListView] = useState(false);
  const [page, setPage] = useState(0);
  const [counter, setCounter] = useState(0);
  const [apps, setApps] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orderBy, setOrderBy] = useState({
    column: 'id',
    direction: 'desc',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('Categories');
  const [showTagsContainer, setShowTagsContainer] = useState(false);
  const [showSearchContainer, setShowSearchContainer] = useState(false);
  const [searchTrending, setSearchTrending] = useState([]);
  const navigate = useNavigate();

  const toggleModal = () => {
    setOpenModal(false);
    document.body.style.overflow = 'visible';
  };

  const parseFiltersFromPath = useCallback(() => {
    // Remove "/apps/" from the start
    const path = location.pathname.replace(/^\/apps\/?/, '');
    const parts = path.split('/');

    const filters = {};
    for (let i = 0; i < parts.length; i += 2) {
      const key = parts[i];
      const value = parts[i + 1];
      if (key && value) {
        filters[key] = value.split(',');
      }
    }
    return filters;
  }, [location.pathname]);

  // set filters from url
  useEffect(() => {
    const filters = parseFiltersFromPath();

    setFilteredCategories(filters.categories || []);
    setFilteredTags(filters.tags || []);
    setFilteredFeatures(filters.features || []);
    setFilteredUserTypes(filters.userTypes || []);
    setFilteredBusinessModels(filters.businessModels || []);
    setFilteredUseCases(filters.useCases || []);
    setFilteredIndustries(filters.industries || []);
    setFilteredPricing(filters.pricing || []);
    setFilteredPlatforms(filters.platforms || []);
    setFilteredSocials(filters.socials || []);
    setFilteredOther(filters.other || []);
    setFilteredSearch(filters.search || []);
  }, [location.pathname, parseFiltersFromPath]);

  // first fetch
  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams({
      page: 0,
      column: orderBy.column,
      direction: orderBy.direction,
    });

    // Categories
    if (filteredCategories.length > 0) {
      params.append('categories', filteredCategories.join(','));
    }

    // Tags
    if (filteredTags.length > 0) {
      params.append('tags', filteredTags.join(','));
    }

    // Features
    if (filteredFeatures.length > 0) {
      params.append('features', filteredFeatures.join(','));
    }

    // User types
    if (filteredUserTypes.length > 0) {
      params.append('userTypes', filteredUserTypes.join(','));
    }

    // Business models
    if (filteredBusinessModels.length > 0) {
      params.append('businessModels', filteredBusinessModels.join(','));
    }

    // useCases
    if (filteredUseCases.length > 0) {
      params.append('useCases', filteredUseCases.join(','));
    }

    // Industries
    if (filteredIndustries.length > 0) {
      params.append('industries', filteredIndustries.join(','));
    }

    // Pricing
    if (filteredPricing.length > 0) {
      params.append('pricing', filteredPricing.join(','));
    }

    // Platforms
    if (filteredPlatforms.length > 0) {
      params.append('platforms', filteredPlatforms.join(','));
    }

    // Socials
    if (filteredSocials.length > 0) {
      params.append('socials', filteredSocials.join(','));
    }

    // Other
    if (filteredOther.length > 0) {
      params.append('other', filteredOther.join(','));
    }

    // Search
    if (filteredSearch.length > 0) {
      params.append('search', filteredSearch.join(','));
    }

    const url = `${apiURL()}/apps?${params.toString()}`;

    async function fetchData() {
      const response = await fetch(url);
      const json = await response.json();

      let hasMore = true;
      if (json.data.some((item) => item.id === json.lastItem.id)) {
        hasMore = false;
      }

      setApps({
        data: json.data,
        lastItem: json.lastItem,
        hasMore,
      });
      // setPage((prevPage) => prevPage + 1);
      setPage(1);
      setIsLoading(false);
    }

    fetchData();
  }, [
    filteredCategories,
    orderBy.column,
    orderBy.direction,
    filteredPricing,
    filteredTags,
    filteredPlatforms,
    filteredSocials,
    filteredOther,
    filteredFeatures,
    filteredUserTypes,
    filteredBusinessModels,
    filteredUseCases,
    filteredIndustries,
    searchParams,
    filteredSearch,
  ]);

  const fetchApps = async () => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams({
      page,
      column: orderBy.column,
      direction: orderBy.direction,
    });

    // Categories
    if (filteredCategories.length > 0) {
      params.append('categories', filteredCategories.join(','));
    }

    // Tags
    if (filteredTags.length > 0) {
      params.append('tags', filteredTags.join(','));
    }

    // Features
    if (filteredFeatures.length > 0) {
      params.append('features', filteredFeatures.join(','));
    }

    // User types
    if (filteredUserTypes.length > 0) {
      params.append('userTypes', filteredUserTypes.join(','));
    }

    // Business models
    if (filteredBusinessModels.length > 0) {
      params.append('businessModels', filteredBusinessModels.join(','));
    }

    // useCases
    if (filteredUseCases.length > 0) {
      params.append('useCases', filteredUseCases.join(','));
    }

    // Industries
    if (filteredIndustries.length > 0) {
      params.append('industries', filteredIndustries.join(','));
    }

    // Pricing
    if (filteredPricing.length > 0) {
      params.append('pricing', filteredPricing.join(','));
    }

    // Platforms
    if (filteredPlatforms.length > 0) {
      params.append('platforms', filteredPlatforms.join(','));
    }

    // Socials
    if (filteredSocials.length > 0) {
      params.append('socials', filteredSocials.join(','));
    }

    // Other
    if (filteredOther.length > 0) {
      params.append('other', filteredOther.join(','));
    }

    // Search
    // if (search && search.trim() !== '') {
    //   params.append('search', search.trim());
    // }

    // Search
    if (filteredSearch.length > 0) {
      params.append('search', filteredSearch.join(','));
    }

    const url = `${apiURL()}/apps?${params.toString()}`;

    const response = await fetch(url);
    const json = await response.json();

    // setApps({ data: json.data, totalCount: json.totalCount, hasMore });

    let hasMore = true;

    if (json.data.some((item) => item.id === json.lastItem.id)) {
      hasMore = false;
    }

    setApps((prevItems) => {
      return {
        data: [...prevItems.data, ...json.data],
        lastItem: json.lastItem,
        hasMore,
      };
    });

    setPage((prev) => prev + 1);
  };

  // useEffect(() => {
  //   async function fetchAppsSearch() {
  //     const responseApps = await fetch(`${apiURL()}/apps/`);

  //     const responseAppsJson = await responseApps.json();

  //     if (searchTerms) {
  //       const filteredSearch = responseAppsJson.filter(
  //         (item) =>
  //           item.title.toLowerCase().includes(searchTerms.toLowerCase()) ||
  //           item.description
  //             .toLowerCase()
  //             .includes(searchTerms.toLowerCase()) ||
  //           item.categoryTitle
  //             .toLowerCase()
  //             .includes(searchTerms.toLowerCase()),
  //       );
  //       setResultsHome(filteredSearch);
  //     }
  //   }
  //   fetchAppsSearch();
  // }, [searchTerms]);

  useEffect(() => {
    setPage(0);
  }, [location]);

  useEffect(() => {
    setPage(0);
  }, [sortOrder]);

  useEffect(() => {
    setPage(0);
  }, [filteredPricing]);

  // useEffect(() => {
  //   setPage(0);
  // }, [filteredDetails]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(`${apiURL()}/categories/`);
      const data = await response.json();
      const sorted = data.sort((a, b) => a.title.localeCompare(b.title));
      setCategories(sorted);
    }

    async function fetchTags() {
      const response = await fetch(`${apiURL()}/tags/`);
      const data = await response.json();
      const sorted = data.sort((a, b) => a.title.localeCompare(b.title));
      setTags(sorted);
    }

    async function fetchFeatures() {
      const response = await fetch(`${apiURL()}/features/`);
      const data = await response.json();
      const sorted = data.sort((a, b) => a.title.localeCompare(b.title));
      setFeatures(sorted);
    }

    async function fetchUserTypes() {
      const response = await fetch(`${apiURL()}/userTypes/`);
      const data = await response.json();
      const sorted = data.sort((a, b) => a.title.localeCompare(b.title));
      setUserTypes(sorted);
    }

    async function fetchBusinessModels() {
      const response = await fetch(`${apiURL()}/businessModels/`);
      const data = await response.json();
      const sorted = data.sort((a, b) => a.title.localeCompare(b.title));
      setBusinessModels(sorted);
    }

    async function fetchUseCases() {
      const response = await fetch(`${apiURL()}/useCases/`);
      const data = await response.json();
      const sorted = data.sort((a, b) => a.title.localeCompare(b.title));
      setUseCases(sorted);
    }

    async function fetchIndustries() {
      const response = await fetch(`${apiURL()}/industries/`);
      const data = await response.json();
      const sorted = data.sort((a, b) => a.title.localeCompare(b.title));
      setIndustries(sorted);
    }

    fetchCategories();
    fetchTags();
    fetchFeatures();
    fetchUserTypes();
    fetchBusinessModels();
    fetchUseCases();
    fetchIndustries();
  }, []);

  const updateUrlFromFilters = (filters) => {
    const parts = [];
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        parts.push(`${key}/${values.join(',')}`);
      }
    });
    navigate(`/apps/${parts.join('/')}`, { replace: true });
  };

  const filterHandler = (type, id) => {
    const filters = parseFiltersFromPath();
    const currentValues = filters[type] || [];

    const newValues = currentValues.includes(String(id))
      ? currentValues.filter((v) => v !== String(id))
      : [...currentValues, id];

    if (newValues.length > 0) {
      filters[type] = newValues;
    } else {
      delete filters[type];
    }

    updateUrlFromFilters(filters);
  };
  // const filterHandler = (type, id) => {
  //   const params = new URLSearchParams(location.search);
  //   const existing = params.get(type)?.split(',') || [];

  //   const newValues = existing.includes(String(id))
  //     ? existing.filter((v) => v !== String(id))
  //     : [...existing, id];

  //   if (newValues.length > 0) {
  //     params.set(type, newValues.join(','));
  //   } else {
  //     params.delete(type);
  //   }

  //   navigate(`/apps?${params.toString()}`, { replace: true });
  // };

  // const filterHandler = (type, id) => {
  //   let currentValues;
  //   let setter;

  //   switch (type) {
  //     case 'categories':
  //       currentValues = filteredCategories;
  //       setter = setFilteredCategories;
  //       break;
  //     case 'tags':
  //       currentValues = filteredTags;
  //       setter = setFilteredTags;
  //       break;
  //     case 'features':
  //       currentValues = filteredFeatures;
  //       setter = setFilteredFeatures;
  //       break;
  //     case 'userTypes':
  //       currentValues = filteredUserTypes;
  //       setter = setFilteredUserTypes;
  //       break;
  //     case 'businessModels':
  //       currentValues = filteredBusinessModels;
  //       setter = setFilteredBusinessModels;
  //       break;
  //     case 'useCases':
  //       currentValues = filteredUseCases;
  //       setter = setFilteredUseCases;
  //       break;
  //     case 'industries':
  //       currentValues = filteredIndustries;
  //       setter = setFilteredIndustries;
  //       break;
  //     case 'pricing':
  //       currentValues = filteredPricing;
  //       setter = setFilteredPricing;
  //       break;
  //     case 'platforms':
  //       currentValues = filteredPlatforms;
  //       setter = setFilteredPlatforms;
  //       break;
  //     case 'socials':
  //       currentValues = filteredSocials;
  //       setter = setFilteredSocials;
  //       break;
  //     case 'other':
  //       currentValues = filteredOther;
  //       setter = setFilteredOther;
  //       break;
  //     case 'search':
  //       currentValues = filteredSearch;
  //       setter = setFilteredSearch;
  //       break;
  //     default:
  //       return;
  //   }

  //   const newValues = currentValues.includes(id)
  //     ? currentValues.filter((v) => v !== id)
  //     : [...currentValues, id];

  //   setter(newValues);

  //   // Prepare all filters in an object
  //   const allFilters = {
  //     categories: type === 'categories' ? newValues : filteredCategories,
  //     tags: type === 'tags' ? newValues : filteredTags,
  //     features: type === 'features' ? newValues : filteredFeatures,
  //     userTypes: type === 'userTypes' ? newValues : filteredUserTypes,
  //     businessModels:
  //       type === 'businessModels' ? newValues : filteredBusinessModels,
  //     useCases: type === 'useCases' ? newValues : filteredUseCases,
  //     industries: type === 'industries' ? newValues : filteredIndustries,
  //     pricing: type === 'pricing' ? newValues : filteredPricing,
  //     platforms: type === 'platforms' ? newValues : filteredPlatforms,
  //     socials: type === 'socials' ? newValues : filteredSocials,
  //     other: type === 'other' ? newValues : filteredOther,
  //     search: type === 'search' ? newValues : filteredSearch,
  //   };

  //   const params = new URLSearchParams();

  //   // Only add non-empty arrays to the URL
  //   Object.entries(allFilters).forEach(([key, value]) => {
  //     if (value.length > 0) {
  //       params.set(key, value.join(','));
  //     }
  //   });

  //   navigate(`/apps?${params.toString()}`, { replace: true });
  // };

  const clearFiltersHandler = () => {
    // Reset all filter states
    setFilteredCategories([]);
    setFilteredTags([]);
    setFilteredFeatures([]);
    setFilteredUserTypes([]);
    setFilteredBusinessModels([]);
    setFilteredUseCases([]);
    setFilteredIndustries([]);
    setFilteredPricing([]);
    setFilteredPlatforms([]);
    setFilteredSocials([]);
    setFilteredOther([]);
    setFilteredSearch([]);

    // Reset the URL (remove all query params)
    navigate('/', { replace: true });

    // ✅ Optional: also reset pagination/apps if needed
    // setPage(0);
    // setApps({ data: [], lastItem: null, hasMore: true });
  };

  const filterHandlerAllCategories = () => {
    setFilteredCategories([]);

    // remove `/categories/...` from the pathname
    const newPath = location.pathname.replace(/\/categories\/[^/]+/, '');

    // keep query params if any
    const params = new URLSearchParams(location.search);
    const search = params.toString();

    navigate(search ? `${newPath}?${search}` : newPath, { replace: true });
  };

  const filterHandlerAllTags = () => {
    setFilteredTags([]);

    const newPath = location.pathname.replace(/\/tags\/[^/]+/, '');

    // keep query params if any
    const params = new URLSearchParams(location.search);
    const search = params.toString();

    navigate(search ? `${newPath}?${search}` : newPath, { replace: true });
  };

  const filterHandlerAllSearches = () => {
    setFilteredSearch([]);

    const newPath = location.pathname.replace(/\/search\/[^/]+/, '');

    // keep query params if any
    const params = new URLSearchParams(location.search);
    const search = params.toString();

    navigate(search ? `${newPath}?${search}` : newPath, { replace: true });
  };

  const categoriesList = categories.map((category) => {
    return (
      <Button
        onClick={() => filterHandler('categories', category.slug)}
        primary={filteredCategories.includes(String(category.slug))}
        secondary={!filteredCategories.includes(String(category.slug))}
        label={category.title}
      />
    );
  });

  const tagsList = tags.map((tag) => {
    return (
      <Button
        onClick={() => filterHandler('tags', tag.slug)}
        primary={filteredTags.includes(String(tag.slug))}
        secondary={!filteredTags.includes(String(tag.slug))}
        label={capitalize(tag.title)}
      />
    );
  });

  useEffect(() => {
    async function fetchTrendingSearch() {
      const response = await fetch(`${apiURL()}/analytics?search=true`);
      const dataSearchAnalytics = await response.json();

      const result = dataSearchAnalytics
        .sort((a, b) => {
          return b.activeUsers - a.activeUsers;
        })
        .slice(0, 20);
      setSearchTrending(result);
    }

    fetchTrendingSearch();
  }, []);

  const searchList = searchTrending.map((searchItem) => {
    return (
      <Button
        onClick={() => filterHandler('search', searchItem.searchId)}
        primary={filteredTags.includes(String(searchItem.searchId))}
        secondary={!filteredTags.includes(String(searchItem.searchId))}
        label={capitalize(searchItem.searchId)}
      />
    );
  });

  useEffect(() => {
    let column;
    let direction;
    if (sortOrder === 'A-Z') {
      column = 'title';
      direction = 'asc';
    } else if (sortOrder === 'Z-A') {
      column = 'title';
      direction = 'desc';
    } else {
      column = 'id';
      direction = 'desc';
    }

    setOrderBy({ column, direction });
  }, [sortOrder]);

  const sortOptions = ['Recent', 'A-Z', 'Z-A'];

  const pricingList = PRICING_OPTIONS.map((item) => (
    <li key={item.key}>
      <input
        type="checkbox"
        value={item.key} // send key instead of label
        checked={filteredPricing.includes(item.key)} // ✅ bind state
        onChange={() => filterHandler('pricing', item.key)}
      />{' '}
      {item.label} {/* show human-friendly label */}
    </li>
  ));

  const platformsList = PLATFORMS_OPTIONS.map((item) => (
    <li key={item.key}>
      <input
        type="checkbox"
        value={item.key} // send key instead of label
        checked={filteredPlatforms.includes(item.key)} // ✅ bind state
        onChange={() => filterHandler('platforms', item.key)}
      />{' '}
      {item.label} {/* show human-friendly label */}
    </li>
  ));

  const socialsList = SOCIALS_OPTIONS.map((item) => (
    <li key={item.key}>
      <input
        type="checkbox"
        value={item.key} // send key instead of label
        checked={filteredSocials.includes(item.key)} // ✅ bind state
        onChange={() => filterHandler('socials', item.key)}
      />{' '}
      {item.label} {/* show human-friendly label */}
    </li>
  ));

  const otherList = OTHER_OPTIONS.map((item) => (
    <li key={item.key}>
      <input
        type="checkbox"
        value={item.key} // send key instead of label
        checked={filteredOther.includes(item.key)} // ✅ bind state
        onChange={() => filterHandler('other', item.key)}
      />{' '}
      {item.label} {/* show human-friendly label */}
    </li>
  ));

  const fetchFavorites = useCallback(async () => {
    const url = `${apiURL()}/favorites`;
    const response = await fetch(url, {
      headers: {
        token: `token ${user?.uid}`,
      },
    });
    const favoritesData = await response.json();

    if (Array.isArray(favoritesData)) {
      setFavorites(favoritesData);
    } else {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = async (appId) => {
    const response = await fetch(`${apiURL()}/favorites`, {
      method: 'POST',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: appId,
      }),
    });
    if (response.ok) {
      fetchFavorites();
    }
  };

  const handleDeleteBookmarks = (favoritesId) => {
    const deleteFavorites = async () => {
      const response = await fetch(`${apiURL()}/favorites/${favoritesId} `, {
        method: 'DELETE',
        headers: {
          token: `token ${user?.uid}`,
        },
      });

      if (response.ok) {
        fetchFavorites();
      }
    };

    deleteFavorites();
  };

  const tabsGroup = tabs.map((tab) => {
    return (
      <Button
        tertiary={activeTab === tab}
        secondary={activeTab !== tab}
        label={tab}
        className="tab"
        onClick={() => {
          setActiveTab(tab);
        }}
      />
    );
  });

  const hasActiveFilters =
    filteredCategories.length > 0 ||
    filteredTags.length > 0 ||
    filteredFeatures.length > 0 ||
    filteredUserTypes.length > 0 ||
    filteredBusinessModels.length > 0 ||
    filteredUseCases.length > 0 ||
    filteredIndustries.length > 0 ||
    filteredPricing.length > 0 ||
    filteredPlatforms.length > 0 ||
    filteredSocials.length > 0 ||
    filteredOther.length > 0 ||
    filteredSearch.length > 0;

  const filterConfig = [
    {
      key: 'categories',
      label: 'Categories',
      values: filteredCategories,
      setter: setFilteredCategories,
      options: categories,
    },
    {
      key: 'tags',
      label: 'Tags',
      values: filteredTags,
      setter: setFilteredTags,
      options: tags,
    },
    {
      key: 'features',
      label: 'Features',
      values: filteredFeatures,
      setter: setFilteredFeatures,
      options: features,
    },
    {
      key: 'userTypes',
      label: 'User Types',
      values: filteredUserTypes,
      setter: setFilteredUserTypes,
      options: userTypes,
    },
    {
      key: 'businessModels',
      label: 'Business Models',
      values: filteredBusinessModels,
      setter: setFilteredBusinessModels,
      options: businessModels,
    },
    {
      key: 'useCases',
      label: 'Use Cases',
      values: filteredUseCases,
      setter: setFilteredUseCases,
      options: useCases,
    },
    {
      key: 'industries',
      label: 'Industries',
      values: filteredIndustries,
      setter: setFilteredIndustries,
      options: industries,
    },
    {
      key: 'pricing',
      label: 'Pricing',
      values: filteredPricing,
      setter: setFilteredPricing,
      options: PRICING_OPTIONS,
    },
    {
      key: 'platforms',
      label: 'Platforms',
      values: filteredPlatforms,
      setter: setFilteredPlatforms,
      options: PLATFORMS_OPTIONS,
    },
    {
      key: 'socials',
      label: 'Socials',
      values: filteredSocials,
      setter: setFilteredSocials,
      options: SOCIALS_OPTIONS,
    },
    {
      key: 'other',
      label: 'Other',
      values: filteredOther,
      setter: setFilteredOther,
      options: OTHER_OPTIONS,
    },
    {
      key: 'search',
      label: 'Search',
      values: filteredSearch,
      setter: setFilteredSearch,
      options: [],
    },
  ];

  const { pageMetaTitle, pageMetaDescription, pageHeaderTitle } = getPageMeta({
    filterConfig,
  });

  return (
    <main>
      <Helmet>
        <title>{pageMetaTitle}</title>
        <meta name="description" content={pageMetaDescription} />
      </Helmet>
      {/* <div className="hero"></div> */}
      <div className="hero apps">
        <h1 className="hero-header">{pageHeaderTitle}</h1>
      </div>
      <div className="tabs-group">{tabsGroup}</div>
      {activeTab === 'Categories' && (
        <section className="container-topics-desktop">
          <Button
            primary={!filteredCategories.length > 0}
            secondary={filteredCategories.length > 0}
            label="All categories"
            onClick={filterHandlerAllCategories}
          />
          {categoriesList}
        </section>
      )}
      {activeTab === 'Tags' && (
        <section className="container-topics-desktop">
          <Button
            primary={!filteredTags.length > 0}
            secondary={filteredTags.length > 0}
            label="All tags"
            onClick={filterHandlerAllTags}
          />
          {tagsList}
          <Link to="/tags">
            <Button tertiary label="See all tags..." />
          </Link>
        </section>
      )}
      {activeTab === 'Searches' && (
        <section className="container-topics-desktop">
          <Link to="/">
            <Button
              primary={!filteredSearch.length > 0}
              secondary={filteredSearch.length > 0}
              label="All searches"
              onClick={filterHandlerAllSearches}
            />
          </Link>

          {searchList}
        </section>
      )}
      {hasActiveFilters && (
        <section className="container-active-filters">
          {/* Active filter chips */}
          {filterConfig.map(
            (filter) =>
              filter.values.length > 0 && (
                <div key={filter.key} className="active-filter-item">
                  <span className="font-semibold">{filter.label}:</span>
                  {filter.values.map((item) => {
                    // find the matching option for display
                    const option = filter.options.find(
                      (opt) => String(opt.key ?? opt.slug) === String(item),
                    );
                    const displayLabel = option?.title || option?.label || item;

                    return (
                      <Button
                        key={item}
                        backgroundColor="#eee"
                        type="button"
                        onClick={() => filterHandler(filter.key, item)}
                        secondary
                        label={capitalize(displayLabel)}
                        icon={<X size={18} />}
                      />
                    );
                  })}
                </div>
              ),
          )}

          <Button
            backgroundColor="#FE3D32"
            type="button"
            onClick={clearFiltersHandler}
            primary
            label="Clear all filters"
          />
        </section>
      )}
      <section className="container-filters">
        <Button
          secondary
          className="button-topics"
          onClick={(event) =>
            setShowCategoriesContainer(!showCategoriesContainer)
          }
          backgroundColor="#ffe5d9"
          label="Categories"
        />
        <Button
          secondary
          className="button-topics"
          onClick={(event) => {
            setShowTagsContainer(!showTagsContainer);
            setShowCategoriesContainer(false);
            setShowSearchContainer(false);
          }}
          backgroundColor="#ffe5d9"
          label="Tags"
        />
        <Button
          secondary
          className="button-topics"
          onClick={(event) => {
            setShowSearchContainer(!showSearchContainer);
            setShowCategoriesContainer(false);
            setShowTagsContainer(false);
          }}
          backgroundColor="#ffe5d9"
          label="Searches"
        />
        <DropDownView
          selectedOptionValue={sortOrder}
          className="no-line-height"
          options={sortOptions}
          onSelect={(option) => setSortOrder(option)}
          showFilterIcon={false}
        />

        <Button
          secondary
          onClick={(event) => setShowFiltersContainer(!showFiltersContainer)}
          backgroundColor="#ffe5d9"
          label="Filters"
          icon={<ListFilter size={18} />}
        />
        <Button
          secondary
          onClick={() => setListView(!listView)}
          backgroundColor="#ffe5d9"
        >
          <div className="filter-grid">
            <FontAwesomeIcon size="lg" icon={faGrip} />
            <FontAwesomeIcon icon={faList} />
          </div>
        </Button>
      </section>
      <section
        className={`container-topics-mobile ${
          showCategoriesContainer && 'show'
        }`}
      >
        <Button
          primary={!filteredCategories.length > 0}
          secondary={filteredCategories.length > 0}
          label="All categories"
          onClick={filterHandlerAllCategories}
        />

        {categoriesList}
      </section>
      <section
        className={`container-details-section ${
          showFiltersContainer && 'show'
        }`}
      >
        <div className="container-details filters">
          <div className="container-form">
            <div>
              <h3>Features</h3>
              <MultiSelectDropdown
                options={features}
                selected={filteredFeatures}
                onChange={filterHandler}
                placeholder="Select features"
                valueKey="slug"
                labelKey="title"
                title="features"
              />
              <h3>User types</h3>
              <MultiSelectDropdown
                options={userTypes}
                selected={filteredUserTypes}
                onChange={filterHandler}
                placeholder="Select user types"
                valueKey="slug"
                labelKey="title"
                title="userTypes"
              />
              <h3>Business Models</h3>
              <MultiSelectDropdown
                options={businessModels}
                selected={filteredBusinessModels}
                onChange={filterHandler}
                placeholder="Select business models"
                valueKey="slug"
                labelKey="title"
                title="businessModels"
              />
              <h3>Use cases</h3>
              <MultiSelectDropdown
                options={useCases}
                selected={filteredUseCases}
                onChange={filterHandler}
                placeholder="Select use cases"
                valueKey="slug"
                labelKey="title"
                title="useCases"
              />
              <h3>Industries</h3>
              <MultiSelectDropdown
                options={industries}
                selected={filteredIndustries}
                onChange={filterHandler}
                placeholder="Select industries"
                valueKey="slug"
                labelKey="title"
                title="industries"
              />
            </div>
            <div>
              <h3>Pricing</h3>
              <ul className="filter-list">{pricingList}</ul>
            </div>
            <div>
              <h3>Platforms</h3>
              <ul className="filter-list">{platformsList}</ul>
            </div>
            <div>
              <h3>Socials</h3>
              <ul className="filter-list">{socialsList}</ul>
            </div>
            <div>
              <h3>Other</h3>
              <ul className="filter-list">{otherList}</ul>
            </div>
          </div>
        </div>
        <Button
          secondary
          type="button"
          onClick={() => setShowFiltersContainer(!showFiltersContainer)}
          className="btn-filters"
        >
          X
        </Button>
      </section>
      {apps.data ? (
        <section className="container-scroll">
          <InfiniteScroll
            dataLength={apps.data.length}
            next={fetchApps}
            hasMore={apps.hasMore} // Replace with a condition based on your data source
            loader={<p>Loading...</p>}
            endMessage={<p>No more data to load.</p>}
            className={`container-cards ${listView ? 'list' : 'grid'}`}
          >
            {apps.data.map((app) => {
              return (
                <Card
                  listCard={listView}
                  id={app.id}
                  title={app.title}
                  description={app.description}
                  url={app.url}
                  urlImage={app.url_icon || globe}
                  topic={app.categoryTitle}
                  topicId={app.categorySlug}
                  pricingType={app.pricing_type}
                  isFavorite={favorites.some((x) => x.id === app.id)}
                  addFavorite={(event) => addFavorite(app.id)}
                  deleteBookmark={() => handleDeleteBookmarks(app.id)}
                  bookmarkOnClick={() => {
                    setOpenModal(true);
                    setModalTitle('Sign up to add bookmarks');
                  }}
                  cardUrl={`/apps/${app.slug}`}
                />
              );
            })}
          </InfiniteScroll>
        </section>
      ) : (
        <Loading />
      )}
      <Modal title={modalTitle} open={openModal} toggle={toggleModal}>
        <Link to="/signup">
          <Button primary label="Create an account" />
        </Link>
        or
        <Link to="/login">
          <Button secondary label="Log in" />
        </Link>
      </Modal>
    </main>
  );
};
