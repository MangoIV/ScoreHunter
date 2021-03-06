package de.blank42.scorehunter.lobby.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.runtime.annotations.RegisterForReflection;

import javax.websocket.Session;

@RegisterForReflection
public class LobbyPlayer {

    private String playerName;
    private boolean ready;

    @JsonIgnore
    private Session session;

    public LobbyPlayer() {
    }

    public LobbyPlayer(String playerName, Session session) {
        this.playerName = playerName;
        this.session = session;
        this.ready = false;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public boolean isReady() {
        return ready;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }
}
