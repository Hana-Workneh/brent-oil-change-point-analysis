from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)


@app.route("/api/prices")
def prices():
    df = pd.read_csv("../data/raw/BrentOilPrices.csv")
    df["Date"] = pd.to_datetime(df["Date"], dayfirst=True, errors="coerce")
    df = df.dropna(subset=["Date"])
    return jsonify(
        df[["Date", "Price"]].to_dict(orient="records")
    )

@app.route("/api/events")
def events():
    df = pd.read_csv("../data/events/brent_key_events.csv")
    df["event_date"] = pd.to_datetime(df["event_date"], errors="coerce")
    return jsonify(df.to_dict(orient="records"))

@app.route("/api/change-point")
def change_point():
    # placeholder until Task 2 finishes
    return jsonify({
        "tau_date": "2020-04-01",
        "note": "Change point detected during COVID-19 oil market shock"
    })

if __name__ == "__main__":
    app.run(debug=True)
