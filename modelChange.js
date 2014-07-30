var Gaffa = require('gaffa');

function change(behaviour){
    var gaffa = behaviour.gaffa;

    if(!behaviour.condition.value){
        return;
    }

    var throttleTime = behaviour.throttle;
    if(!isNaN(throttleTime)){
        var now = new Date();
        if(!behaviour.lastTrigger || now - behaviour.lastTrigger > throttleTime){
            behaviour.lastTrigger = now;
            behaviour.triggerActions('change');
        }else{
            clearTimeout(behaviour.timeout);
            behaviour.timeout = setTimeout(function(){
                    behaviour.lastTrigger = now;
                    behaviour.triggerActions('change');
                },
                throttleTime - (now - behaviour.lastTrigger)
            );
        }
    }else{
        behaviour.triggerActions('change');
    }
}

function ModelChangeBehaviour(){}
ModelChangeBehaviour = Gaffa.createSpec(ModelChangeBehaviour, Gaffa.Behaviour);
ModelChangeBehaviour.prototype._type = 'modelChange';
ModelChangeBehaviour.prototype.condition = new Gaffa.Property({
    update: change,
    value: true
});
ModelChangeBehaviour.prototype.watch = new Gaffa.Property(change);

module.exports = ModelChangeBehaviour;