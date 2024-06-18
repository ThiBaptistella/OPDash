import * as tf from "@tensorflow/tfjs";

// Forecasting function
export const forecastFinancials = async (
  categories: string[],
  revenue: number[],
  expenses: number[]
): Promise<{
  futureCategories: string[];
  futureRevenue: number[];
  futureExpenses: number[];
}> => {
  // Prepare the data
  const dataLength = categories.length;
  const Xs = Array.from({ length: dataLength }, (_, i) => i + 1);
  const YsRevenue = revenue;
  const YsExpenses = expenses;

  console.log("Historical Data:", { Xs, YsRevenue, YsExpenses });

  const xs = tf.tensor2d(Xs, [dataLength, 1]);
  const ysRevenue = tf.tensor2d(YsRevenue, [dataLength, 1]);
  const ysExpenses = tf.tensor2d(YsExpenses, [dataLength, 1]);

  // Define the model
  const createModel = () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ optimizer: "sgd", loss: "meanSquaredError" });
    return model;
  };

  // Train the models
  const revenueModel = createModel();
  const expensesModel = createModel();

  await revenueModel.fit(xs, ysRevenue, { epochs: 100 });
  await expensesModel.fit(xs, ysExpenses, { epochs: 100 });

  // Forecast the future
  const futureLength = 12; // Forecast for 12 months
  const futureXs = tf.tensor2d(
    Array.from({ length: futureLength }, (_, i) => dataLength + i + 1),
    [futureLength, 1]
  );

  const futureRevenue = revenueModel.predict(futureXs) as tf.Tensor;
  const futureExpenses = expensesModel.predict(futureXs) as tf.Tensor;

  const futureRevenueArray = Array.from(futureRevenue.dataSync());
  const futureExpensesArray = Array.from(futureExpenses.dataSync());

  console.log("Future Data:", {
    futureCategories: Array.from(
      { length: futureLength },
      (_, i) => `Month ${i + 1}`
    ),
    futureRevenueArray,
    futureExpensesArray,
  });

  return {
    futureCategories: Array.from(
      { length: futureLength },
      (_, i) => `Month ${i + 1}`
    ),
    futureRevenue: futureRevenueArray,
    futureExpenses: futureExpensesArray,
  };
};
