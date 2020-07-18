import valuesService from '../api/services/valuesService';

describe('values endpoint', () => {
  it('should query', async () => {
    expect.assertions(2);
    const res = await valuesService.getValuesService({ params: { key: 'cobre' } });
    expect(res.status).toStrictEqual(200);
    expect(res.body).toHaveProperty('data');
  });
});
