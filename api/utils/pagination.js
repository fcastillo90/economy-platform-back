import defaultValues from '../config';

const getPagination = query => {
  const LIMIT = query.limit && query.limit > 0 && query.limit < 100 ? Number(query.limit) : defaultValues.DEFAULT_LIMIT;
  let PAGE = query.page ? query.page : defaultValues.DEFAULT_PAGE;
  PAGE = PAGE && PAGE > 0 ? PAGE - 1 : 0;
  const SKIP = PAGE * LIMIT;
  const SORT = { 'created_date': -1 };
  return { LIMIT, PAGE, SKIP, SORT };
};

export default {
  getPagination
};
