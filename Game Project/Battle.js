
let globalWeapons = {}

let globalArmor = {}

function Start()
{
    globalWeapons = 
    {
        shortSword: new Weapon('Short Sword', new EquiptableStats(0, 10, 15, ["Slashing", "Piercing"], ["Cleeve", "Drill Strike"]), "Simple")
    }

    globalArmor = 
    {
        chainMail: new Armor('Chain Mail', new EquiptableStats(10, 0, 0, [null], ["Defend"]), "Medium", 'body')
    }

    const player = new Player(new WarriorClass())
    
    console.log(player.equipted.armor)
    console.log(player.equipted.hands)
}




class Stats
{
    constructor(strength, defence, agility, intelligence, mana, vitality)
    {
        this.strength = strength
        this.defence = defence
        this.agility = agility
        this.intelligence = intelligence
        this.mana = mana
        this.vitality = vitality
    }
}


//=========================================================================

//              ENTITIES

//=========================================================================





class DefaultEntity
{
    constructor(equipted, stats)
    {
        this.equipted = {armor: {head: null, body: null, pants: null, boots: null, gloves: null}, hands: {left: null, right: null}}
        this.equiptItems(equipted)
        this.stats = stats
    }


    attack(enemy)
    {
        enemy.onHit(this.getDamage())
    }

    equiptItems(equipting)
    {
        for (const item of equipting) 
        {
            switch(item.equiptType.toUpperCase())
            {
                case "SIMPLE":
                    if(this.equipted.hands.right == null)
                    {
                        this.equipted.hands.right = item
                    }
                    else if (this.equipted.hands.left == null)
                    {
                        this.equipted.hands.left = item
                    }
                    break

                case "MEDIUM":
                    if(this.equipted.armor[item.slot] == null)
                    {
                        this.equipted.armor[item.slot] = item
                    }  
                    break

                default:
                    break
            }
        }
    }

    getDamage()
    {
        
    }

    onHit(damage)
    {

    }
}


class Player extends DefaultEntity
{
    constructor(myClass)
    {
        super(myClass.startingGear, myClass.defaultStats)
        this.myClass = myClass
        this.bag = myClass.startingBag
    }

    static onDeath()
    {

    }
}


class DefaultEnemy extends DefaultEntity
{

}


// -----------------------
// Entity RPG Classes
// -----------------------


class EntityClass
{
    constructor(stats, skills, weaponTypes, startingGear, startingBag)
    {
        this.defaultStats = stats
        this.skills = skills
        this.weaponTypes = weaponTypes
        this.startingGear = startingGear
        this.startingBag = startingBag
    }
}


class WarriorClass extends EntityClass
{
    constructor()
    {
        super(new Stats(20, 12, 10, 8, 5, 13), null, ["Simple"], [globalWeapons.shortSword, globalArmor.chainMail], new Bag())
    }
}





//=========================================================================

//              EQUIPTABLES

//=========================================================================



//------------------------------------
//      EQUPTABLES STATS
//------------------------------------


class EquiptableStats
{
    constructor(armor, minAttack, maxAttack, damageType, skills)
    {
        
    }
}

class ToolStats
{

}


//----------------------------------
//      EQUIPTABLE ITEMS
//----------------------------------


class Equiptable
{
    constructor(name, equipStats, equiptType)
    {
        this.name = name
        this.equipStats = equipStats
        this.equiptType = equiptType
    }
}


class Weapon extends Equiptable
{
    constructor(name, equipStats, equiptType)
    {
        super(name, equipStats, equiptType)
    }
}


class Armor extends Equiptable
{
    constructor(name, equipStats, equiptType, slot)
    {
        super(name, equipStats, equiptType)
        this.slot = slot
    }
}


class Tool extends Equiptable
{

}


class Bag
{
    constructor()
    {
        this.contents = []
    }

    addToBag(items)
    {
        for (const item of items) 
        {
            this.contents.push(item)
        }
    }

    removeFromBag()
    {

    }

    findInBag()
    {

    }
}


Start()