const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const mailchimpApiKey = "fc96101040bc2dd55357fd44eaef4078-us11";
const mailchimpServerPrefix = "us11";

app.post("/send-email", async (req, res) => {
  const { to_email, subject, htmlContent } = req.body;

  try {
    const campaignResponse = await axios.post(
      `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/campaigns`,
      {
        // Include the necessary campaign creation details here
      },
      {
        headers: {
          Authorization: `Bearer ${mailchimpApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const campaignId = campaignResponse.data.id;

    await axios.put(
      `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/campaigns/${campaignId}/content`,
      {
        html: htmlContent,
      },
      {
        headers: {
          Authorization: `Bearer ${mailchimpApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    await axios.post(
      `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/campaigns/${campaignId}/actions/send`,
      {}, // No data required for this request
      {
        headers: {
          Authorization: `Bearer ${mailchimpApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
