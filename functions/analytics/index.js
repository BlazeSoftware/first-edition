module.exports = (store) => {
  const app = require('express')();

  app.use(require('cors')({ origin: true }));
  app.use(require('body-parser').raw({ type: '*/*' }));

  app.get('/analytics/read/:id', async (req, res) => {
    if (!req.params.id) {
      return res.send(400);
    }

    try {
      const docSnapshot = await store
        .collection('documents')
        .doc(req.params.id)
        .get();

      if (!docSnapshot.exists) {
        return res.send(404);
      }

      const views = docSnapshot.data().views || 0;

      docSnapshot.ref.update({
        views: views + 1,
      });

      res.send(200);
    } catch (e) {
      console.error(e.message);
      res.status(500).send(e.message);
    }
  });

  return app;
};
