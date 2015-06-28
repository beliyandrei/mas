package org.traccar.protocol;

import org.jboss.netty.bootstrap.ServerBootstrap;
import org.jboss.netty.channel.ChannelPipeline;
import org.jboss.netty.handler.codec.frame.LineBasedFrameDecoder;
import org.jboss.netty.handler.codec.string.StringDecoder;
import org.jboss.netty.handler.codec.string.StringEncoder;
import org.traccar.BaseProtocol;
import org.traccar.TrackerServer;
import org.traccar.protocol.commands.CommandTemplate;
import org.traccar.http.commands.CommandType;

import java.util.List;
import java.util.Map;

public class LaipacProtocol extends BaseProtocol {

    public LaipacProtocol() {
        super("laipac");
    }

    @Override
    protected void loadCommandsTemplates(Map<CommandType, CommandTemplate> templates) {
        
    }

    @Override
    public void addTrackerServersTo(List<TrackerServer> serverList) {
        serverList.add(new TrackerServer(new ServerBootstrap(), this.getName()) {
            @Override
            protected void addSpecificHandlers(ChannelPipeline pipeline) {
                pipeline.addLast("frameDecoder", new LineBasedFrameDecoder(1024));
                pipeline.addLast("stringDecoder", new StringDecoder());
                pipeline.addLast("stringEncoder", new StringEncoder());
                pipeline.addLast("objectDecoder", new LaipacProtocolDecoder(LaipacProtocol.this));
            }
        });
    }
}