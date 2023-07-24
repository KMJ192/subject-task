import { rest } from 'msw';

import romance1 from './romance/page_1.json';
import romance2 from './romance/page_2.json';
import romance3 from './romance/page_3.json';
import romance4 from './romance/page_4.json';
import romance5 from './romance/page_5.json';

import drama1 from './drama/page_1.json';
import drama2 from './drama/page_2.json';
import drama3 from './drama/page_3.json';
import drama4 from './drama/page_4.json';
import drama5 from './drama/page_5.json';

function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

const handlers = [
  rest.get('/api/comics/romance', async (req, res, ctx) => {
    const { searchParams } = req.url;
    const page = searchParams.get('page');

    // virtual latency
    await sleep(1000);

    return res(
      ctx.status(200),
      (() => {
        if (page === '1') {
          return ctx.json(romance1);
        }
        if (page === '2') {
          return ctx.json(romance2);
        }
        if (page === '3') {
          return ctx.json(romance3);
        }
        if (page === '4') {
          return ctx.json(romance4);
        }
        if (page === '5') {
          return ctx.json(romance5);
        }
        return ctx.json({});
      })(),
    );
  }),
  rest.get('/api/comics/drama', async (req, res, ctx) => {
    const { searchParams } = req.url;
    const page = searchParams.get('page');

    await sleep(1000);

    return res(
      ctx.status(200),
      (() => {
        if (page === '1') {
          return ctx.json(drama1);
        }
        if (page === '2') {
          return ctx.json(drama2);
        }
        if (page === '3') {
          return ctx.json(drama3);
        }
        if (page === '4') {
          return ctx.json(drama4);
        }
        if (page === '5') {
          return ctx.json(drama5);
        }
        return ctx.json({});
      })(),
    );
  }),
];

export { handlers };
