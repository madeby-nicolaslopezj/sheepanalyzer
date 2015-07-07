Jobs.attachSchema(new SimpleSchema({
  targetId: {
    type: String
  },
  type: {
    type: String,
    allowedValues: JobTypes.types
  },
  data: {
    type: Object,
    optional: true,
    blackbox: true
  },
  isRunning: {
    type: Boolean,
    autoValue: function() {
      if (this.isInsert) {
        return false;
      } else if (this.isUpsert) {
        return { $setOnInsert: false };
      }
    }
  },
  nextRun: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
    }
  },
  lastRun: {
    type: Date,
    optional: true
  },
  startedAt: {
    type: Date,
    optional: true
  },
  createdAt: orion.attribute('createdAt')
}))
