import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAYFBMVEUAAAD////4+Pjm5ub09PSXl5egoKBjY2OysrLb29vJycn7+/sfHx+/v7/T09Pp6em4uLg7OzswMDCCgoJaWlomJiYYGBiPj48RERFFRUV6enqsrKxAQEBUVFRvb28rKytpG4vvAAAFKElEQVR4nO2c65KiMBCFEQIISkS8IqPz/m+5UrszNeTG6aQNTtWe/zv1bQh9PZisArWTTX7ru3Ny3Xb9IW/kLvQvrlZJ0L/O8vIjUdSXRShXAFQ2dCrQN1gbxOUNJfK9DWnUR5FGhxKFi+iv1pu4UFK7SSbdq5hQBwRpVB4NKitRpiR5eF14OlSFIz3VZTGg6i0JKtnL10PVNKRR9OtOhKqvdKiOTEWDot2nL22pt50ElUHhSddRvBCKEAumur0OCkgtNq1fBVV5XPIvfZKuFQHq7s/0DO2vgWpDmJKEEkNhKNGHQZWE+gqGasKYSEcFQ1lLX1R3fiiPnKcKzzYoFFzX2YVXfCCUCH56lGQDQslwJsLzA6FyDig414BQzh4P1ZEXSnxyQH3yQskzBxRc7GFQgXnvn65oUMegAiqpn2pZoS48UMM7QhWsUAxJZhSaaKJCXf5DgeJ9fG/59jHFKTQjY1BrHqiaFcpn2KLrjA7QMKjdiQPqhHZZYD3FUA0nSQ8yoVA3Dig0y6BQwa3oKLgdBaF2DDd9z93NbB7hUAeUCW5GGWpPNErhUCK4Sj/BTPiAIzjToLUwBWpH3DSo+iBMiPFJXuBRUUaxOFQadFR7AhNlEBsUQElrIwJUSKzCYxQRapV6p2U4FdOhvKdUJ+Iei7bF8ozr1D0kcd/nNTxD+wVfKB8qMhN9h0zutuDSLgCK2tk0dCYfX0JL6CL2eL0SBrWq4CVb6WcO8rKVpDlUHZ89rpM/1DOMHueZHr7+G3//VDODVXrdpkCo1aZxLN8fAUiBnjxRHA05el8OAS6zYKinqiYvu59Aee3jA/KCEpms26FYV2ZLm9hVUlY72wEJORRDK2UGniACJdaH+9dypvR4pZr79zleoAA/CyVaJVRSA2KlbMAe9ayBcA5q0KN3R/KIXPQ4Oxst3FCNuQA+ws+wMe/kSnfZ54LaWMuUE1YjpdY/cHb+AQdU5to89sBhNa4MWTo6ZjuUekHV/+thpg+fc146XhgrFOB0u9hPK63nm0T7EM0GVSE93va4NoZDkUMV18NGZYHCN9m3dhrlhVzDLjmbqcoCRZkGn/pH3srqKTlcyp4yXbO8g2Yopl3MrCyrbiNUFonJNiEyQjGMglEZy3gTFINXCtanqfoyQXn6Xv1kWuEaoFhWHrgMgV2HSoHuiVOGo9KhYt6oUVv9VulQkQ/K9AJqUBnLZpaibh4qVjD/IS2sq1AiyLbsJ22erUL5fTAQJq2wUqEWeHr681Ohor97o9T3T4EKXaD5SV1IKFCRU8w/qbZGBYrF+UpX44LasJgi6CpcUBxmah/dXFDx6uCpeuGAWuaeJ2pRNYVa6J6r4XMK5f2xVajWDqjAb2P8dbBDLfXyqf75CVS1SJIZtbdD8fgBfdSlVqjFIkJyyqxQw2JQZ2mFWqTC+6vaCrVY7FTcVRMoJjO1jwYr1EKFy6jCBsVhUWSHShdLfb8OapH+6o2h8v9QoH7XRX/LOPWeuW+50uVqrxLessjLWL5E8dF0GDRtsaIuQH7q5oB6yw55iTHsqM414FgqfCof/imTPJ4PjqlSvxxTp8OLTBPU6b4KFXuHNapTV37abmaBjkazPmlQm+ixSv8hIX3fV0UO63fdXGLYIcuoA6EPg1vGaAFg+ckGTHeTYclolgj9CR5cZguO2esimL6GnpPlozGbf0pGKI0PNq+Z3f42Z6MORrI7GF3uxSw/vujKz3ie3T7PNKuHQ9lt2Qa01+3+cWnljOf5D1peRPKWrlewAAAAAElFTkSuQmCC",
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      maxLength: 10,
      minLength: 10,
      unique: true,
    },
    password: {
      type: String,
    },
    wishlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    role: {
      type: String,
      enum: ["User", "Seller", "Admin"],
      default: "User",
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  } else {
    return next();
  }
});
userSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});
const users = new mongoose.model("users", userSchema);

export default users;
