package com.example.vijaya.earthquakeapp;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.Buffer;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class QueryUtils {
    /**
     * Tag for the log messages
     */
    private static final String LOG_TAG = QueryUtils.class.getSimpleName();

    /**
     * Create a private constructor because no one should ever create a {@link QueryUtils} object.
     * This class is only meant to hold static variables and methods, which can be accessed
     * directly from the class name QueryUtils (and an object instance of QueryUtils is not needed).
     */
    private QueryUtils() {
    }

    /**
     * Query the USGS dataset and return a list of {@link Earthquake} objects.
     */
    public static List<Earthquake> fetchEarthquakeData2(String requestUrl) {
        // An empty ArrayList that we can start adding earthquakes to
        List<Earthquake> earthquakes = new ArrayList<>();
        //  URL object to store the url for a given string
        URL url = null;
        // A string to store the response obtained from rest call in the form of string
        String jsonResponse = "";
        BufferedReader in;
        StringBuilder stringBuildTmp = new StringBuilder();
        String inputLineTmp;

        // values to create earth quake object with
        double quakeMag;
        String quakeLoc;
        long quakeTime;
        String quakeURL;

        try {
            //TODO: 1. Create a URL from the requestUrl string and make a GET request to it
            url = new URL(requestUrl);
            HttpURLConnection externalCon = (HttpURLConnection) url.openConnection();
            externalCon.setRequestMethod("GET");
            externalCon.setReadTimeout(15000);
            externalCon.setConnectTimeout(15000);
            //externalCon.setRequestProperty("Content-Type", "application/json");
            externalCon.connect();

            //TODO: 2. Read from the Url Connection and store it as a string(jsonResponse)
            // SHOULD USE THIS TO PARSE RESPONSE
            int status = externalCon.getResponseCode();
            in = new BufferedReader(new InputStreamReader(externalCon.getInputStream()));

            while ((inputLineTmp = in.readLine()) != null) {
                stringBuildTmp.append(inputLineTmp);
            }
            in.close();

        } catch (Exception e) {
            Log.e(LOG_TAG, "Exception:  ", e);
        }

        /*TODO: 3. Parse the jsonResponse string obtained in step 2 above into JSONObject to extract the values of
        "mag","place","time","url"for every earth quake and create corresponding Earthquake objects with them
        Add each earthquake object to the list(earthquakes) and return it. */
        jsonResponse = stringBuildTmp.toString();
        try {
            JSONObject tmpJson = new JSONObject(jsonResponse);
            JSONArray array = tmpJson.getJSONArray("features");

            for (int i = 0; i < array.length(); i++) {
                tmpJson = array.getJSONObject(i);
                JSONObject props = tmpJson.getJSONObject("properties");

                quakeMag = props.isNull("mag") ? null : props.getDouble("mag");
                quakeLoc = props.isNull("place") ? null : props.getString("place");
                quakeTime = props.isNull("time") ?  null : props.getLong("time");
                quakeURL = props.isNull("url") ? null : props.getString("url");

                Earthquake tmpQuake = new Earthquake(quakeMag, quakeLoc, quakeTime, quakeURL    );
                earthquakes.add(tmpQuake);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        // Return the list of earthquakes
        return earthquakes;
    }
}
