const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("./api/workouts", (req, res) => {
  const { day, exercises } = req.body;
  Workout.create({ day, exercises })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("./api/workouts", (req, res) => {
  Workout.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});
router.put("./api/workouts/:id", ({ body, params }, res) => {
  console.log(body, params);
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log("err", err);
      res.json(err);
    });
});

router.delete("./api/workouts/:id", ({ body, params }, res) => {
  Workout.findOneAndRemove({ _id: params.id })
    .then((dbWorkout) => res.json(dbWorkout))
    .catch((err) => {
      console.log("err", err);
      res.json(err);
    });
});

router.get("./api/workouts/range", (req, res) => {
  Workout.find({})
    .then((dbWorkout) => res.json(dbWorkout))
    .catch((err) => {
      console.log("err", err);
      res.json(err);
    });
});
module.exports = router;
