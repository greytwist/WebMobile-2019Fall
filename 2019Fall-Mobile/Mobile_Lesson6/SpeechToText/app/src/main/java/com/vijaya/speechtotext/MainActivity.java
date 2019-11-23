package com.vijaya.speechtotext;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.speech.tts.TextToSpeech;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private static final int REQ_CODE_SPEECH_INPUT = 100;
    private TextView mVoiceInputTv;
    private ImageButton mSpeakBtn;

    private static final int REQ_TTS_STATUS_CHECK = 0;
    private static final String TAG = "TTS Testing";

    TextToSpeech tts;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Intent checkIntent = new Intent();
        checkIntent.setAction(TextToSpeech.Engine.ACTION_CHECK_TTS_DATA);
        startActivityForResult(checkIntent, REQ_TTS_STATUS_CHECK);

        tts=new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if(status != TextToSpeech.ERROR) {
                    tts.setLanguage(Locale.US);
                    playMessage("Hello");
                }
            }
        });

        mVoiceInputTv = (TextView) findViewById(R.id.voiceInput);
        mSpeakBtn = (ImageButton) findViewById(R.id.btnSpeak);
        mSpeakBtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                startVoiceInput();
            }
        });

    }

    private void startVoiceInput() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Hello, How can I help you?");
        try {
            startActivityForResult(intent, REQ_CODE_SPEECH_INPUT);

        } catch (ActivityNotFoundException a) {

        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        switch (requestCode) {
            case REQ_CODE_SPEECH_INPUT: {
                if (resultCode == RESULT_OK && null != data) {
                    ArrayList<String> result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    mVoiceInputTv.setText(result.get(0));

                    String response = call(result.get(0));
                    playMessage(response);

                }
                break;
            }

        }
    }

    public String call(String call){

        String response = "";

        switch (call) {
            case "hello":
                response = "What is your name?";
                break;
            case "I am not feeling good. What should I do?":
                response = "I can understand. Please tell your symptoms in short.";
                break;
            case "Thank you, my Medical Assistant":
                response = "Thank you too " +  this.userName +" Take care";
                break;
            case "What time is it?":
                response = "The time is " + this.currentTime;
                break;
            case "What medicines should I take?":
                response = "I think you have fever. Please take this medicine.";
                break;
            default :
                response = "Sorry I'm not familiar with that";
        }

        return response;

    }

    @Override
    public void onPause()
    {
        super.onPause();
        // if we're losing focus, stop talking
        if( this.tts != null)
            this.tts.stop();
    }

    @Override
    public void onDestroy()
    {
        super.onDestroy();
        this.tts.shutdown();
    }


    private void playMessage(String message){
        this.tts.speak(message, TextToSpeech.QUEUE_ADD, null);
    }
}