const Portfolio = require("../../models/portfolio");

exports.add = async (req, res) => {
  const { portfolio, _id } = req.body;
  try {
    if (!portfolio || !_id) {
      return res.json({
        status: false,
        message: "Fields are required",
      });
    }
    const Portfolio = new Portfolio({ portfolio, user: _id });
    await Portfolio.save();
    res.json({
      status: true,
      message: "Saved",
      result: Portfolio,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
exports.update = async (req, res) => {
  const {
    objectives,
    personalInformation,
    projectInformation,
  } = req.body;
  try {
    if (
      !objectives ||
      !personalInformation ||
      !projectInformation
    ) {
      return res.json({
        status: false,
        message: "Fields are required",
      });
    }
    const portfolio = await Portfolio.findOneAndUpdate(
      { _id },
      {
        objectives,
        personalInformation,
        projectInformation,
        updated_at: Date.now(),
      }
    );
    res.json({
      status: true,
      message: "Updated",
      result: portfolio,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  const { user_id } = req.query;
  try {
    if (!user_id) {
      return res.json({
        status: false,
        message: "user_id is required",
      });
    }
    const findPortfolio = await Portfolio.find({ user: user_id }).populate(
      "user"
    );
    res.json({
      status: true,
      message: "Fetched",
      result: findPortfolio,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
exports.delete = async (req, res) => {
  const { _id } = req.query;
  try {
    if (!_id) {
      return res.json({
        status: false,
        message: "_id is required",
      });
    }
    const Portfoliodelete = await Portfolio.findOneAndDelete({ _id });
    res.json({
      status: false,
      message: "Deleted",
      result: Portfoliodelete,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
exports.addPortfolios = async (req, res) => {
  console.log("Req body: ", req.body);

  const { portfolio, projectInformation, personalInformation, _id , objectives, portfolioName } = req.body;
  try {
    if (!portfolio || !_id) {
      return res.json({
        status: false,
        message: "Fields are required",
      });
    }
    console.log("Adding portfolio!");
    const myPortfolio = new Portfolio({
      templatesFontFamily: portfolio.templatesFontFamily,
      changeColor: portfolio.changeColor,
      personalInformation: personalInformation,
      projectInformation: projectInformation,
      objectives: objectives,
      portfolioName: portfolioName,
      user: _id,
    });
    await myPortfolio.save();
    console.log("Portfolio saved!");
    res.json({
      status: true,
      message: "Saved",
      result: myPortfolio,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
    });
  }
};
exports.updatePortolio = async (req, res) => {
  const { _id, updateData } = req.body;
  try {
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { _id },
      updateData,
      { new: true }
    );
    res.json({ status: true, message: "Updated", result: updatedPortfolio });
  } catch (error) {
    console.log("Error updating portfolio: ", error);
    res.json({ status: false, message: error.message });
  }
};
exports.deletePortfolio = async (req, res) => {
  const { _id } = req.query;
  try {
    const deletedPortfolio = await Portfolio.findOneAndDelete({ _id });
    res.json({ status: true, message: "Deleted", result: deletedPortfolio });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
exports.getUserPortfolios = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(404).json({
        status: false,
        message: "User id must be provided",
      });
    }

    const portfolios = await Portfolio.find({ user: user_id });

    res.status(200).json({
      status: true,
      message: "Portfolios found",
      results: portfolios,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.getUserPortfolioById = async (req, res) => {
  try {
    const { portfolio_id } = req.query;
    if (!portfolio_id) {
      return res.status(404).json({
        status: false,
        message: "User id must be provided",
      });
    }

    const portfolios = await Portfolio.find({ _id: portfolio_id });

    res.status(200).json({
      status: true,
      message: "Portfolios found",
      results: portfolios,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
