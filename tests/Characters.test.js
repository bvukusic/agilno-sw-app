const search = require('../screens/Characters');
const axios = require('axios');

jest.mock('axios');


describe('search', () => {
  it('Should resolve with response data', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          name: 'Luke Skywalker',
        },
        {
          name: 'Darth Vader',
        }
      ]
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('http://swapi.dev/api/films/?format=json')
    )
  });
})