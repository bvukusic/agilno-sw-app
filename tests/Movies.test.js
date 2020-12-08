const search = require('../screens/Characters');
const axios = require('axios');

jest.mock('axios');


describe('search', () => {
    it('Should resolve with response data', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                {
                    title: 'A New Hope',
                    episode_id: '4'
                },
                {
                    title: 'Empire Strikes Back',
                    episode_id: '5'
                }
            ]
        });

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('http://swapi.dev/api/films/?format=json')
        )
    });
  })