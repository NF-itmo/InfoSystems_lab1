package org.events;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Event;
import jakarta.inject.Inject;

@ApplicationScoped
public class DataChangePublisher {
    @Inject
    private Event<DataChangedEvent> dataChangedEvent;

    public void publish() {
        dataChangedEvent.fire(new DataChangedEvent());
    }
}
