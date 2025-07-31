import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: function () {
        return !this.isGoogleUser; // Password required only if not using Google Auth
      },
    },

    age: {
      type: String,
      enum: ["1-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60+"],
    },

    // Store user's country
    country: {
      type: String,
      trim: true,
    },

    googleId: {
      type: String,
      default: null,
    },

    isGoogleUser: {
      type: Boolean,
      default: false,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationTokenExpiry: {
      type: Date,
    },

    passwordChangedAt: Date,

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    blocked: {
      type: Boolean,
      default: false,
    },

    wishlist: [{ type: Schema.ObjectId, ref: "product" }],

    addresses: [
      {
        city: String,
        street: String,
        phone: String,
      },
    ],

    picture: {
      type: String,
    },
    
    resetPasswordCode: {
      type: String,
    },
    
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isGoogleUser) return next();
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

// Hash password before update (for findOneAndUpdate)
userSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.password && !update.isGoogleUser) {
    update.password = bcrypt.hashSync(update.password, 8);
  }
  next();
});

export const User = model("user", userSchema);