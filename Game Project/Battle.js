
let globalWeapons = {}

let globalArmor = {}

const activeSkopes = {optionsSkope: 4, enemySkope: 0}
let selectionCords = 1
let selectorSkope = 4
let selectionTarget = '#option'

let isBarSelector = false
let onButtonRunning = false

const enemyContEl = document.querySelector("#enemy-container")
const playerContEL = document.querySelector("#player-container")

const actionBarEl = document.querySelector("#action-bar")

const player = []
const enemies = []

function Start()
{
    globalWeapons = 
    {
        shortSword: new Weapon('Short Sword', new EquiptableStats(0, 10, 15, ["Slashing", "Piercing"], ["Cleeve", "Drill Strike"]), "Simple"),
    }

    globalArmor = 
    {
        chainMail: new Armor('Chain Mail', new EquiptableStats(10, 0, 0, [null], ["Defend"]), "Medium", 'body')
    }

    player.push(new Player(new WarriorClass()))

    initalizePlayers()
    initalizeEnemies()

    window.addEventListener("keydown", onKeyPress)
}


async function initalizeEnemies()
{
    for (let i = getRandNum(1, 4); i <= 4; i++) 
    {
        let enemyProbablity = getRandNum(1, 100)
        if(enemyProbablity <= 90)
        {
            enemies.push(new DefaultEnemy(new Slime()))
        }
        else if (enemyProbablity > 90)
        {
            enemies.push(new DefaultEnemy(new RedSlime()))
        }
    }

    for (let i = 1; i <= enemies.length; i++) 
    {
        let enemyEl = document.createElement('div')
        enemyEl.className = "all-enemies"
        enemyEl.id = 'enemy' + i

        let enemyImg = document.createElement('img')
        enemyImg.className = "entity-img"
        enemyImg.setAttribute('src', 'Images/' + enemies[i-1].enemyType.enemyType + '.png')
        enemyEl.appendChild(enemyImg)

        let enemyDmgNum = document.createElement('h1')
        enemyDmgNum.className = 'entity-damage-number'
        enemyEl.appendChild(enemyDmgNum)

        let enemyDmgBarCont = document.createElement('div')
        enemyDmgBarCont.className = "entity-hp-bar-cont"

        let enemyDmgBarTotal = document.createElement('div')
        enemyDmgBarTotal.className = "entity-hp-bar-total"

        enemyDmgBarCont.style.gridTemplateColumns = enemies[i-1].stats.currentVitality + "fr " + -(enemies[i-1].stats.currentVitality - enemies[i-1].stats.totalVitality) + 'fr'

        enemyDmgBarCont.appendChild(enemyDmgBarTotal)

        enemyEl.appendChild(enemyDmgBarCont)

        enemyContEl.appendChild(enemyEl)
    }

    activeSkopes.enemySkope = enemies.length
}


async function initalizePlayers()
{
    for (let i = 1; i <= player.length; i++) 
    {
        let playerEL = document.createElement('div')
        playerEL.className = "all-players"
        playerEL.id = "player" + i

        let playerIMGEL = document.createElement('img')
        playerIMGEL.className = 'entity-img'
        playerIMGEL.setAttribute('src', 'Images/' + player[i-1].myClass.playerType + '.png')
        playerEL.appendChild(playerIMGEL)

        let playerDmgNum = document.createElement('h1')
        playerDmgNum.className = 'player-damage-number'
        playerEL.appendChild(playerDmgNum)

        let playerDmgBarCont = document.createElement('div')
        playerDmgBarCont.className = "player-hp-bar-cont"

        let playerDmgBarTotal = document.createElement('div')
        playerDmgBarTotal.className = "player-hp-bar-total"

        playerDmgBarCont.appendChild(playerDmgBarTotal)

        playerEL.appendChild(playerDmgBarCont)

        playerContEL.appendChild(playerEL)
    }
}


function removeEnemy(enemyID)
{
    document.querySelector('#enemy' + (enemyID + 1)).remove()
    selectorSkope--
    for (let i = enemyID + 2; i <= enemies.length + 1; i++) 
    {
        console.log(i)
        document.querySelector('#enemy' + i).id = 'enemy' + (i - 1)
    }
    activeSkopes.enemySkope--
}


async function onKeyPress(event)
{
    if(onButtonRunning)
    {
        return
    }
    onButtonRunning = true
    let previousSelect = null

    let activeOption = await onArrowKeys(event.key.toUpperCase())
    
    await onSpaceKey(event.key.toUpperCase(), activeOption)

    await onArrowKeys('')

    onButtonRunning = false
}


async function onSpaceKey(keyPress, activeOption)
{
    if(keyPress == " ")
    {
        switch(activeOption.textContent.toUpperCase())
        {
            case "ATTACK":
                selectionTarget = "#enemy"
                activeOption.style.backgroundColor = 'gray'
                selectorSkope = activeSkopes.enemySkope
                console.log(selectorSkope)
                isBarSelector = true

            default:
                break
        }

        switch(activeOption.id.toUpperCase().slice(0, -1))
        {
            case "ENEMY":
                await onEnemySelect(activeOption)
                break
                // let enemyPos = activeOption.id.charAt(activeOption.id.length - 1) - 1
                // player[0].attack(enemies[enemyPos], enemyPos, player[0])
                // activeOption.style.backgroundColor = 'gray'
                // selectionTarget = "#option"
                // selectorSkope = activeSkopes.optionsSkope
                // isBarSelector = false
                // if(enemies.length != 0)
                // {
                //     enemysAttack()
                // }
                // else
                // {
                //     setTimeout(() => {alert('Battle Won!')}, 1)
                //     setTimeout(() => {initalizeEnemies()}, 2)
                // }

            default:
                break
        }
    }
}


async function onEnemySelect(activeOption)
{
    let enemyPos = activeOption.id.charAt(activeOption.id.length - 1) - 1

    await player[0].attack(enemies[enemyPos], enemyPos, player[0])

    activeOption.style.backgroundColor = 'gray'
    selectionTarget = "#option"
    selectorSkope = activeSkopes.optionsSkope
    isBarSelector = false

    if(enemies.length != 0)
    {
        await new Promise((resolve, reject) => {setTimeout(() => resolve(enemysAttack()), 300)})
    }
    else
    {
        await new Promise((resolve, reject) => {setTimeout(() => resolve(alert('Battle Won!')), 5) } )

        await new Promise((resolve, reject) => {setTimeout(() => resolve(initalizeEnemies()), 2)})
    }
}


function onBattleWin()
{

}


async function displayDamageNumber(damage, damagedEl, entity)
{
    try
    {
        console.log(damage + " damage taken")
        console.log(damagedEl)
        damagedEl.children[1].textContent = damage
        damagedEl.children[2].style.gridTemplateColumns = (clampNum(0, 9999999999999, entity.stats.currentVitality)) + "fr " + -(clampNum(0, 9999999999999, entity.stats.currentVitality) - entity.stats.totalVitality) + 'fr'
    }
    catch(error)
    {console.log(error)}
    return
}


async function onArrowKeys(keyPress)
{
    let previousSelect = null
    switch(keyPress)
    {
        case "ARROWUP":
            if(selectionCords > 2 && !isBarSelector)
            {
                previousSelect = selectionCords
                selectionCords -= 2
            }
            break
        
        case "ARROWDOWN":
            if(selectionCords <= 2 && !isBarSelector)
            {
                previousSelect = selectionCords
                selectionCords += 2
            }
            break

        case "ARROWLEFT":
            if(selectionCords > 1)
            {
                previousSelect = selectionCords
                selectionCords--
            }
            break

        case "ARROWRIGHT":
            if(selectionCords < selectorSkope)
            {
                previousSelect = selectionCords
                selectionCords++
            }
            break

        default:
            previousSelect = null
            break
    }

    if (previousSelect != null)
    {
        let previousOption = document.querySelector(selectionTarget + previousSelect)
        previousOption.style.backgroundColor = 'gray'
    }

    let activeOption = document.querySelector(selectionTarget + selectionCords)
    activeOption.style.backgroundColor = "blue"
    return activeOption
}


async function enemysAttack()
{
    for (const enemy of enemies) 
    {
        console.log('test')
        await new Promise((resolve, reject) => {setTimeout(() => 
            {resolve(enemy.attack(player[0], 0, enemies[enemy]))},
             10000 * (enemy + 1))})
    }
}


function getRandNum(min, max)
{
    return Math.floor((Math.random() * (max - min + 1)) + min)
}


function clampNum(min, max, num)
{
    return Math.min(Math.max(num, min), max)
} 


class Stats
{
    constructor(strength, defence, dexterity, intelligence, mana, vitality)
    {
        this.strength = strength
        this.defence = defence
        this.dexterity = dexterity
        this.intelligence = intelligence
        this.mana = mana
        this.totalVitality = vitality
        this.currentVitality = vitality
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


    async attack(enemy, enemyNum, attackerEntity)
    {
        await enemy.onHit(this.getDamage(), enemyNum, attackerEntity)
    }

    equiptItems(equipting)
    {
        if(equipting != null)
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
    }

    getDamage()
    {
        for (const item in this.equipted.hands) 
        {
            if(this.equipted.hands[item] != null)
            {
                switch(this.equipted.hands[item].equiptType.toUpperCase())
                {
                    case "SIMPLE":
                        return getRandNum(this.equipted.hands[item].equipStats.minAttack, this.equipted.hands[item].equipStats.maxAttack) + ((Math.max(this.stats.strength, this.stats.dexterity) / 100) * this.equipted.hands[item].equipStats.maxAttack)
                
                    default:
                        break
                }
            }
            else
            {
                return (this.stats.strength / 10) * 5
            }
        }
    }

    getDefence()
    {

    }

    async onHit(damage, entityNum, attackingEntity)
    {
        if(clampNum(0, 1, ((getRandNum(0, 15) - 5) / 10) + clampNum(0, 0.9, this.stats.defence / 1000)) > 0)
        {
            this.stats.currentVitality -= damage
            console.log(entityNum)
            console.log(document.querySelector(this.getEntityELType() + (entityNum + 1)))

            try
            {
            
            }
            catch(error){}
            console.log(this.getEntityELType() + (entityNum + 1))
            await displayDamageNumber(damage, document.querySelector(this.getEntityELType() + (entityNum + 1)), this.getEntityArray()[entityNum])
            console.log('success')
                
            console.log(this.myClass)
            console.log(this.stats.currentVitality)
        }

        if (this.stats.currentVitality <= 0)
        {
            await this.onDeath(entityNum, attackingEntity)
        }
        return
    }
}


class Player extends DefaultEntity
{
    constructor(myClass)
    {
        super(myClass.startingGear, myClass.defaultStats)
        this.myClass = myClass
        this.bag = myClass.startingBag
        this.xp = 0
    }

    onXPGain(xpAmmount)
    {
        console.log(xpAmmount)
        this.xp += xpAmmount
        console.log(this.xp + " xp")
        if(this.xp >= 50)
        {
            console.log('Level Up!')
        }
    }

    getEntityArray()
    {
        return player
    }

    getEntityELType()
    {
        return '#player'
    }

    onDeath(playerNum, attackingEnemy)
    {
        setTimeout(() => {alert('Game Over')}, 1)
    }
}


class DefaultEnemy extends DefaultEntity
{
    constructor(enemyType)
    {
        super(enemyType.startingGear, enemyType.defaultStats)
        this.enemyType = enemyType
        this.bag = enemyType.startingBag
    }

    getEntityArray()
    {
        return enemies
    }

    getEntityELType()
    {
        return '#enemy'
    }

    async onDeath(enemyNum, playerEntity)
    {
        console.log("DIED")
        playerEntity.onXPGain(this.enemyType.killXp)
        enemies.splice(enemyNum, 1)
        await new Promise((resolve, reject) => {setTimeout(() => resolve(removeEnemy(enemyNum)), 1000)})
    }
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


class Slime extends EntityClass
{
    constructor()
    {
        super(new Stats(5, 2, 2, 1, 0, 5), ["Flurry Of Blows"], null, null, null)
        this.enemyType = "Blue-Slime"
        this.killXp = 20
    }
}


class RedSlime extends EntityClass
{
    constructor()
    {
        super(new Stats(10, 7, 6, 3, 0, 20), ["Flurry Of Blows"], null, null, null)
        this.enemyType = "Red-Slime"
        this.killXp = 50
    }
}


class WarriorClass extends EntityClass
{
    constructor()
    {
        super(new Stats(30, 12, 10, 8, 5, 25), null, ["Simple"], [globalWeapons.shortSword], new Bag())
        this.playerType = "Warrior-Player"
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
        this.armor = armor
        this.minAttack = minAttack
        this.maxAttack = maxAttack
        this.damageType = damageType
        this.skills = skills
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